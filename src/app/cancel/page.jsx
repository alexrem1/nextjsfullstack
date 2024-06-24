import Link from "next/link";
import { getCheckoutSession } from "../actions/checkout/getCheckoutSession";
import styles from "./cancel.module.css";

export const metadata = {
  title: "Alexquisite Patisserie Cancel Page",
  description: "Failed transaction",
};

async function cancel({ searchParams }) {
  const { session } = await getCheckoutSession(searchParams.session_id);

  return (
    <div className={styles.container}>
      <div className={styles.sessionInfo}>
        {session ? (
          <>
            <p className={styles.message}>This transaction has failed</p>
            <p>Session ID: {session.id}</p>
            <p>Status: {session.payment_status}</p>
            <Link href="/cart">Back to Cart</Link>
          </>
        ) : (
          <p className={styles.message}>
            Failed to retrieve session information
          </p>
        )}
      </div>
    </div>
  );
}

export default cancel;
