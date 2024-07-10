"use client";
import { useCart } from "@/app/contexts/cartContext";
import "./cartUpdate.module.css";
import styles from "./cartUpdate.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function CartUpdate() {
  const [checkPath, setCheckPath] = useState();

  const path = usePathname();

  useEffect(() => {
    setCheckPath(path);
  }, [path]);

  const { cart } = useCart();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div
      className={styles.cartUpdate}
      style={{
        right:
          totalQuantity === 0
            ? "6.5px"
            : totalQuantity < 10
            ? "6.5"
            : totalQuantity < 20
            ? "4.5px"
            : "3px",
      }}
    >
      {checkPath !== "/cart" && totalQuantity}
    </div>
  );
}
export default CartUpdate;
