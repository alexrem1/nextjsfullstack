"use server";

import { loginSchema } from "@/lib/schemas/loginSchema";
import { signIn } from "@/app/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function login(data) {
  let connection;
  try {
    const validatedData = await loginSchema.validate(data, {
      abortEarly: false,
    });

    console.log(validatedData);

    connection = await db.getConnection();
    const [users] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [validatedData.email]
    );

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid || users.length === 0) {
      return {
        success: false,
        error: "Login Unsuccessful. Check your email or password",
      };
    }

    const result = await signIn("credentials", {
      redirect: false,
      // callbackUrl: "/",
      email: user.email,
      password: validatedData.password,
      id: user.userId,
      name: user.name,
    });

    return { result, success: true };
  } catch (error) {
    console.log(error, "Login Failed");
    return {
      success: false,
      error: "Login Unsuccessful. Check your email or password",
    };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
