"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./paymentSuccessful.module.css";
import { useSession } from "next-auth/react";

function PaymentSuccessful({ error, paymentMade, session }) {
  const authenticated = useSession();
  const router = useRouter();
  localStorage.setItem("cart", []);

  const [redirectCountdown, setRedirectCountdown] = useState(5); // Initial countdown time

  useEffect(() => {
    // Countdown effect to redirect after success
    let countdownTimer;
    if (session) {
      countdownTimer = setInterval(() => {
        setRedirectCountdown((prevCount) => prevCount - 1);
      }, 1000);

      if (redirectCountdown === 0) {
        authenticated ? router.push("/account") : router.push("/");
      }
    }

    // Cleanup timer on component unmount or after redirect
    return () => {
      clearInterval(countdownTimer);
    };
  }, [redirectCountdown]);

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.message}>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {session && (
        <div className={styles.details}>
          {paymentMade ? (
            <h1 className={styles.message}>{paymentMade}</h1>
          ) : (
            <h1 className={styles.message}>Payment Successful</h1>
          )}
          <p>Thank you for your purchase!</p>
          <p>Total amount paid: £{(session.amount_total / 100).toFixed(2)}</p>
          <div>
            {session.line_items.data.map((product) => (
              <React.Fragment key={product.id}>
                {product.description.includes("Delivery Cost") && (
                  <p>
                    {product.description}: £
                    {(product.amount_total / 100).toFixed(2)}
                  </p>
                )}
              </React.Fragment>
            ))}
          </div>
          <p>Status: {session.payment_status}</p>
          <p>
            You{"'"}ve purchased:{" "}
            {session.line_items.data
              .filter(
                (product) => !product.description.includes("Delivery Cost")
              )
              .map((product) => `${product.quantity}x ${product.description}`)
              .join(", ")}
          </p>
          <p>An email has been sent out to you confirming your details.</p>
          {authenticated.data ? (
            <p>
              Redirecting to your account page in {redirectCountdown} seconds...
            </p>
          ) : (
            <p>Redirecting to login page in {redirectCountdown} seconds...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PaymentSuccessful;
