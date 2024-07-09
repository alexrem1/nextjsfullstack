import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  // Create a response object to modify headers
  const response = new NextResponse();

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    // Handle preflight request
    return response;
  }

  if (req.method === "POST") {
    try {
      const origin = req.headers.get("origin");

      const { items } = await req.json();

      // Create line items
      const lineItems = items.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.productName,
            // images: [item.productImage],
            description: item.productDesc,
          },
          unit_amount: item.productVariantPrice * 100, // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      }));

      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      });

      return NextResponse.json({ id: session.id }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 200 });
    }
  } else {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405 },
      { headers: { Allow: "POST" } }
    );
  }
};
