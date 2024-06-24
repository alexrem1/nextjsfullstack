import { CheckCircle2 } from "lucide-react";
import styles from "./reviewSubmitted.module.css";
function ReviewSubmitted({ isSubmitted }) {
  return (
    <div
      className={`${styles.reviewSubmitted} ${isSubmitted ? styles.open : ""}`}
    >
      <CheckCircle2 />
      <h1>Review Submitted!</h1>
    </div>
  );
}
export default ReviewSubmitted;
