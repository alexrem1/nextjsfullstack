"use server";
import { db } from "@/lib/db";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { Set } from "core-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function getCheckoutSession(session_id) {
  if (!session_id) {
    return { error: "No Session ID has been found" };
  }

  let connection;

  try {
    connection = await db.getConnection();

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    if (session.payment_status === "paid" && session.status === "complete") {
      // // Check if session_id is already in the database
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
        "INSERT INTO orders (date, name, session_id, email, number, shipping_details) VALUES (?, ?, ?, ?, ?, ?)";

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
        date.getSeconds();

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
              console.log("Inserted product description:", productDesc);
            }
          } catch (error) {
            console.error(
              "Error inserting produc:",
              product.description,
              error
            );
          }
        });

      // Send email notification
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.EMAIL,
        to: session.customer_details.email,
        subject: "Your Order Confirmation",
        html: `
              <p>We are delighted to inform you that your order has been successfully placed.</p>

              <ul>
              <li><p>You have purchased: ${session.line_items.data
                .filter(
                  (product) => !product.description.includes("Delivery Cost")
                )
                .map((product) => `${product.quantity}x ${product.description}`)
                .join(", ")}</p></li>
                <li><p>It'll be sent to the provided shipping address:  ${
                  session.shipping_details.address.line1
                }, ${
          session.shipping_details.address.line2 !== null
            ? `${session.shipping_details.address.line2}, `
            : ""
        } ${session.shipping_details.address.city}, ${
          session.shipping_details.address.postal_code
        } </p></li>
      <li> <p>We'll be in touch with you soon to confirm your order on the number provided: ${
        session.customer_details.phone
      }</p></li>
              </ul>

        <p>If you have any questions or need further assistance, please don't hesitate to reply to this email. We're here to help!</p>

        <p>Thank you for choosing us for your purchase.</p>

        <p>Yours, <br />Alex</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    return { session: JSON.parse(JSON.stringify(session)) };
  } catch (error) {
    console.log(error.message, "mess");
    return { error: error.message };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
