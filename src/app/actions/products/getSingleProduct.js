"use server";

import { db } from "@/lib/db";

export default async function getSingleProduct(productId) {
  let connection;
  const q = "SELECT * FROM products WHERE productId = ?";
  try {
    connection = await db.getConnection();
    const [rows] = await db.query(q, [productId]);
    return rows[0];
  } catch (err) {
    console.error("Error fetching product:", err);
    throw new Error("Error fetching product");
  } finally {
    if (connection) {
      try {
        await connection.release(); // Ensure connection is always released
        console.log("pdps connection released");
      } catch (error) {
        console.error("Error releasing connection:", error);
      }
    }
  }
}
