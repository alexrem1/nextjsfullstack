"use server";

import { passwordResetEmail } from "@/lib/email";
import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/schemas/resetPasswordSchema";
import bcrypt from "bcryptjs";

export default async function resetPassword(data, resetToken) {
  console.log(data, resetToken);
  let connection;

  try {
    connection = await db.getConnection();

    // Validate the incoming data
    const validatedData = await resetPasswordSchema.validate(data, {
      abortEarly: false,
    });

    const [users] = await connection.query(
      "SELECT * FROM users WHERE resetToken = ? AND resetTokenExpires > ?",
      [resetToken, new Date()]
    );

    if (users.length === 0) {
      return {
        success: false,
        error: "Your token has expired, you need to reset your password again.",
      };
    }

    const user = users[0];

    const isSamePassword = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (isSamePassword) {
      return {
        success: false,
        error: "Currently, this is your password. Choose a new password.",
      };
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    await connection.query(
      "UPDATE users SET password = ?, resetToken = NULL, resetTokenExpires = NULL WHERE userId = ?",
      [hashedPassword, user.userId]
    );
    const resetPasswordResult = await passwordResetEmail(user.email);

    return { success: true, message: resetPasswordResult };
  } catch (error) {
    console.log("Error resetting password:", error);

    return { error: "Error resetting password", success: false };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
