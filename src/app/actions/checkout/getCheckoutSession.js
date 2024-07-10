"use server";
import { db } from "@/lib/db";
import Stripe from "stripe";
import { Set } from "core-js";
import { getSession } from "@/lib/getSession";
import { sendOrderConfirmation } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function getCheckoutSession(session_id) {
  if (!session_id) {
    return { error: "No Session ID has been found" };
  }

  let connection;

  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }
  try {
    connection = await db.getConnection();

    const authenticated = await getSession();

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    if (session.payment_status === "paid" && session.status === "complete") {
      // Check if session_id is already in the database
      const checkQuery =
        "SELECT COUNT(*) AS count FROM orders WHERE session_id = ?";
      const [rows] = await connection.query(checkQuery, [session.id]);

      if (rows[0].count > 0) {
        return {
          session: JSON.parse(JSON.stringify(session)),
          paymentMade: "You've already made this payment.",
        };
      }

      const insertQuery =
        "INSERT INTO orders (date, name, session_id, email, number, shipping_details, orderItems, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

      const timestamp = session.created;
      const date = new Date(timestamp * 1000);
      const formattedDate =
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        ", " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        padZero(date.getSeconds());

      const values = [
        formattedDate,
        session.customer_details.name,
        session.id,
        session.customer_details.email,
        session.customer_details.phone,
        `${session.shipping_details.address.line1}, ${
          session.shipping_details.address.line2 !== null
            ? `${session.shipping_details.address.line2}, `
            : ""
        } ${session.shipping_details.address.city}, ${
          session.shipping_details.address.postal_code
        } `,
        session.line_items.data
          .filter((product) => !product.description.includes("Delivery Cost"))
          .map(
            (product) =>
              `${product.quantity}x ${product.description} for £${
                product.amount_total / 100
              }`
          )
          .join(", "),
        authenticated && authenticated.id,
      ];

      const [result] = await connection.query(insertQuery, values);
      const newOrderId = result.insertId;

      const uniqueProductNames = new Set();

      session.line_items.data
        .filter((product) => !product.description.includes("Delivery Cost"))
        .map(async (product) => {
          try {
            const productDesc = product.description.split(" - ")[0];
            if (!uniqueProductNames.has(productDesc)) {
              uniqueProductNames.add(productDesc);

              const q = `
                INSERT INTO recommendations (orderId, productsRec) VALUES (?, ?);
              `;
              const recValues = [newOrderId, productDesc];
              await connection.query(q, recValues);
            }
          } catch (error) {
            return {
              error: `Error inserting products: ${product.description}, ${error}`,
            };
          }
        });

      await sendOrderConfirmation(session);
    }

    return { session: JSON.parse(JSON.stringify(session)) };
  } catch (error) {
    return { error: error.message };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
