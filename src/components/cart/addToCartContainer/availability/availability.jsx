import { useCart } from "@/app/contexts/cartContext";
import styles from "./availability.module.css";
import { LucideMessageCircleWarning } from "lucide-react";

function Availability({ selectedVariant, product, availability }) {
  const { errorMessage } = useCart();
  return (
    <>
      {availability === 0 && (
        <div className={styles.warningMessage}>
          <span className={styles.warningIcon}>
            <LucideMessageCircleWarning />
          </span>
          <p>
            We only make {selectedVariant.productVariantStock}{" "}
            {selectedVariant.productVariantName} {product.productName}
            {"'s"} per order.
          </p>
        </div>
      )}
      {errorMessage && (
        <div className={styles.warningMessage}>
          <span className={styles.warningIcon}>
            <LucideMessageCircleWarning />
          </span>
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}
export default Availability;
