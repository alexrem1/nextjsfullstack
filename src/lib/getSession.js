import { auth } from "@/auth";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await auth();
  if (session?.user) {
    return session?.user;
  }
});
