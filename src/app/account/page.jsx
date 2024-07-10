import styles from "./page.module.css";
import { getSession } from "@/lib/getSession";
import getUser from "@/app/actions/getUser/getUser";
import ProfileDetails from "@/components/profile/profileDetails/profileDetails";
import Orders from "@/components/profile/orders/orders";
async function Account() {
  const session = await getSession();

  const userInfo = await getUser(session?.id);

  if (userInfo.error) {
    return (
      <div className={styles.container}>
        <p>No user found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1>My account</h1>
        <h4>Welcome back, {session.name}</h4>
      </div>

      <div className={styles.profileAndOrders}>
        <div className={styles.profileSection}>
          <ProfileDetails userInfo={userInfo} />
        </div>
        <div className={styles.ordersSection}>
          <Orders userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}
export default Account;
