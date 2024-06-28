import PaymentSuccessful from "@/components/paymentSuccessful/paymentSuccessful";
import { getCheckoutSession } from "../actions/checkout/getCheckoutSession";

export const metadata = {
  title: "Alexquisite Patisserie Success Page",
  description: "Details of your successful transaction",
};

async function Success({ searchParams }) {
  const { session, paymentMade, error } = await getCheckoutSession(
    searchParams.session_id
  );

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <PaymentSuccessful
        error={error}
        session={session}
        paymentMade={paymentMade}
      />
      {/* {session && (
        <>
          {paymentMade ? <h1>{paymentMade}</h1> : <h1>Payment Successful</h1>}
          <p>Session ID: {session.id}</p>
          <p>Amount: £{(session.amount_total / 100).toFixed(2)}</p>
          <p>Status: {session.payment_status}</p>
        </>
      )} */}
    </div>
  );
}

export default Success;
