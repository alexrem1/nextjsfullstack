"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function postReview(data, idProduct) {
  const insertQuery =
    "INSERT INTO reviews (idProduct, comment, rating, name, date) VALUES (?, ?, ?, ?, ?)";

  const date = new Date();
  const formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  const values = [
    idProduct,
    data.comment,
    data.rating,
    data.name,
    formattedDate,
  ];

  console.log(data);
  if (!data) {
    return { error: "Form has not been completed" };
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.query(insertQuery, values);
    await revalidatePath(`/product/${idProduct}`);
    return console.log("success");
  } catch (error) {
    console.log(error.message, "mess");
    return { error: error.message };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
