"use server";
import { db } from "@/lib/db";
import { Set } from "core-js";

async function getCategories() {
  let connection;
  const q = `SELECT productCat FROM products`;

  try {
    connection = await db.getConnection();
    const categories = await connection.query(q);

    // Use a Set to get unique category names
    const uniqueCategories = Array.from(
      new Set(categories[0].map((cat) => cat.productCat))
    );

    // Map the unique category names to the desired object format
    const formattedCategories = uniqueCategories.map((cat) => ({
      productCat: cat,
    }));

    return formattedCategories;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default getCategories;
