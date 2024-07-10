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
    const [existingUserEmail] = await connection.query(
      "SELECT email FROM users WHERE email = ? AND userId != ?",
      [validatedData.email, userId]
    );

    if (existingUserEmail.length > 0) {
      return { success: false, error: "Email already exists" };
    }

    const [users] = await connection.query(
      "SELECT password FROM users WHERE userId = ?",
      [userId]
    );

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
      "UPDATE users SET email = ?, password = ? WHERE userId = ?",
      [validatedData.email, hashedPassword, userId]
    );

    revalidatePath(`/account`);
    return { success: true, message: "Successfully updated profile" };
  } catch (error) {
    console.log(error);
    return { error: `Error updating user profile: ${error}` };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
