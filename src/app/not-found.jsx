import Link from "next/link";
import styles from "./not-found.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h2>Not Found</h2>
      <p>Sorry, the page you&apos;re looking for does not exist.</p>
      <Link href="/">Back to Homepage</Link>
    </div>
  );
}
export default NotFound;
