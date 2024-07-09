"use server";

import { signOut as naSignOut, signIn as naSignIn } from "@/auth";

export async function signOut() {
  await naSignOut();
}

export async function signIn() {
  await naSignIn();
}
