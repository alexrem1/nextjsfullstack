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

      <div className={styles.details}>
        <label>Name</label>
        <p>{userInfo.name}</p>
        <label>Email</label>
        <p>{userInfo.email}</p>
        <label>Password</label>
        <p> {maskPassword(userInfo.password)}</p>
      </div>
      <button onClick={() => router.push("/account/update-profile")}>
        Update user details
      </button>
    </div>
  );
}
export default ProfileDetails;
