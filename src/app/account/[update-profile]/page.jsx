import styles from "./page.module.css";
import { getSession } from "@/lib/getSession";
import getUser from "@/app/actions/getUser/getUser";
import ProfileUpdate from "@/components/profile/profileUpdate/profileUpdate";

async function UpdateUserDetails() {
  const session = await getSession();
  const userInfo = await getUser(session.id);

  return (
    <div className={styles.container}>
      <ProfileUpdate userInfo={userInfo} />
    </div>
  );
}
export default UpdateUserDetails;
