"use client";

import { useRouter } from "next/navigation";
import styles from "./profileDetails.module.css";

function ProfileDetails({ userInfo }) {
  const router = useRouter();
  const maskPassword = () => {
    return "*".repeat(10);
  };
  return (
    <div className={styles.container}>
      <h1>Profile Details</h1>

      <div className={styles.ordersList}>
        <div className={styles.orderCard}>
          <div className={styles.orderDetails}>
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>

            <p>
              <strong>Password:</strong> {maskPassword(userInfo.password)}
            </p>
          </div>
        </div>
      </div>
      <button onClick={() => router.push("/account/update-profile")}>
        Update user details
      </button>
    </div>
  );
}
export default ProfileDetails;
