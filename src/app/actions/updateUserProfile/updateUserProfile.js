"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { updateDetailsSchema } from "@/lib/schemas/updateDetailsSchema";

export default async function updateUserProfile(userId, newDetails) {
  let connection;
  try {
    connection = await db.getConnection();

    // Validate the incoming data
    const validatedData = await updateDetailsSchema.validate(newDetails, {
      abortEarly: false,
    });
    // Check if email already exists
    const [existingUsers] = await connection.query(
      "SELECT email FROM users WHERE email = ? AND userId != ?",
      [validatedData.email, userId]
    );

    if (existingUsers.length > 0) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    await connection.query(
      "UPDATE users SET email = ?, password = ? WHERE userId = ?",
      [validatedData.email, hashedPassword, userId]
    );

    revalidatePath(`/account`);
    return { success: true, message: "Successfully updated profile" };
  } catch (error) {
    return { error: `Error updating user profile: ${error}` };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
