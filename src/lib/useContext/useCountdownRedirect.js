import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useCountdownRedirect(
  isSuccess,
  initialCountdown,
  redirectPath
) {
  const [redirectCountdown, setRedirectCountdown] = useState(initialCountdown);
  const router = useRouter();

  useEffect(() => {
    let countdownTimer;

    if (isSuccess) {
      countdownTimer = setInterval(() => {
        setRedirectCountdown((prevCount) => prevCount - 1);
      }, 1000);

      if (redirectCountdown === 0) {
        router.push(redirectPath);
      }
    }

    return () => {
      clearInterval(countdownTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, redirectCountdown]);

  return { redirectCountdown };
}
