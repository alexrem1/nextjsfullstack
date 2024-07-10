"use server";

import { sendPasswordResetEmail } from "@/lib/email";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { emailSchema } from "@/lib/schemas/emailSchema";

export default async function sendResetPassword(email) {
  let connection;
  try {
    connection = await db.getConnection();

    // Validate the incoming data
    const validatedData = await emailSchema.validate(email, {
      abortEarly: false,
    });

    // Check if email exists in the database
    const [users] = await connection.query(
      "SELECT * FROM users WHERE email =?",
      [validatedData.email]
    );

    if (users.length === 0) {
      console.log("No email found in the database");
      return { success: false, error: "No user found with that email." };
    }

    const user = users[0];
    const resetToken = uuidv4();
    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 1); // Token expires in 1 hour

    await connection.query(
      "UPDATE users SET resetToken = ?, resetTokenExpires = ? WHERE userId = ?",
      [resetToken, resetTokenExpires, user.userId]
    );

    const result = await sendPasswordResetEmail(
      validatedData.email,
      resetToken
    );

    return { success: "true", message: result };
  } catch (error) {
    console.log("Password reset error:", error);
    return {
      success: false,
      error: "An error occurred while resetting your password.",
    };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
