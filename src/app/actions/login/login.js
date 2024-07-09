"use server";

import { loginSchema } from "@/lib/schemas/loginSchema";
import { signIn } from "@/app/auth";

export default async function login(data) {
  try {
    const validatedData = await loginSchema.validate(data, {
      abortEarly: false,
    });

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: validatedData.email,
      password: validatedData.password,
    });

    return { result, success: true };
  } catch (error) {
    return {
      success: false,
      error: "Login Unsuccessful. Check your email or password",
    };
  }
}
