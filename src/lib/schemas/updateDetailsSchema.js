import { registrationSchema } from "@/lib/schemas/registrationSchema";

export const updateDetailsSchema = registrationSchema.omit(["name"]);
