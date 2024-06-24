"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function checkoutSession(
  cartItems,
  origin,
  deliveryCost,
  deliveryOption
) {
  const testy = JSON.parse(JSON.stringify(cartItems));

  const { items } = testy; // Create line items
  console.log(items);
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "gbp",
      product_data: {
        name: `${item.productName} - ${item.productVariantName}`,
        // images: [item.productImage],
        description: item.productDesc,
      },
      unit_amount: Math.round((item.productVariantPrice * 100).toFixed(2)),
    },
    quantity: item.quantity,
  }));

  // Add delivery cost as a separate line item
  lineItems.push({
    price_data: {
      currency: "gbp",
      product_data: {
        name: `Delivery Cost (${deliveryOption})`,
      },
      unit_amount: deliveryCost * 100, // Stripe expects the amount in cents
    },
    quantity: 1,
  });

  // Create a Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    shipping_address_collection: {
      allowed_countries: ["GB"], // List of allowed countries for shipping
    },
    phone_number_collection: {
      enabled: true, // Enable phone number collection
    },
  });

  return session.id;
}
