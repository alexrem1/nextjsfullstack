"use server";

import { db } from "@/lib/db";

export default async function userOrders(userId) {
  let connection;
  const q = `
    SELECT o.id, o.date, o.name, o.email, o.number, o.shipping_details, o.orderItems, o.userId as orderUserId
FROM orders o
JOIN users u ON o.userId = u.userId
WHERE u.userId = ?;
    `;
  try {
    const connection = await db.getConnection();
    const [userOrders] = await connection.query(q, userId);

    return userOrders;
  } catch (error) {
    return { error: "Could not get user orders" };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
