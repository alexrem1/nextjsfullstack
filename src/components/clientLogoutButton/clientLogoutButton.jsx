"use client";
import { signOut } from "@/app/authHelpers";
function ClientLogoutButton() {
  return (
    <button
      onClick={async () => {
        await signOut({ redirect: false });
        window.location.href = "/";
      }}
    >
      Logout
    </button>
  );
}
export default ClientLogoutButton;
