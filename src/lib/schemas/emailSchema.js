import { loginSchema } from "@/lib/schemas/loginSchema";

export const emailSchema = loginSchema.omit(["password"]);
