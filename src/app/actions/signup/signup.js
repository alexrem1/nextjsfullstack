"use server";

import { registrationSchema } from "@/lib/schemas/registrationSchema";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function signup(data) {
  let connection;
  try {
    // Validate the incoming data
    const validatedData = await registrationSchema.validate(data, {
      abortEarly: false,
    });

    // Database connection setup
    connection = await db.getConnection();

    // Check if email already exists
    const [existingUsers] = await connection.query(
      "SELECT email FROM users WHERE email = ?",
      [validatedData.email]
    );

    if (existingUsers.length > 0) {
      return { success: false, message: "Email already in use." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    //Database query
    const insertQuery = `
INSERT INTO users (name, email, password) VALUES (? , ? , ?)
`;

    // db values
    const values = [validatedData.name, validatedData.email, hashedPassword];

    // Execute the query
    await connection.query(insertQuery, values);

    // Return success response
    return { success: true, message: "User registered successfully." };
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      return { success: false, errors: error.errors };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
