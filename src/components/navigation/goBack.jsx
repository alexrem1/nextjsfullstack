"use client";

import { useRouter } from "next/navigation";

function GoBack() {
  const router = useRouter();

  return (
    <div suppressHydrationWarning>
      <button
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    </div>
  );
}
export default GoBack;
