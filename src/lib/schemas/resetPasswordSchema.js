import { registrationSchema } from "@/lib/schemas/registrationSchema";

export const resetPasswordSchema = registrationSchema.omit(["name", "email"]);
