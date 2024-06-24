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
      className={styles.cart}
      style={{ right: totalQuantity < 10 && "13px" }}
    >
      {checkPath !== "/cart" && totalQuantity}
    </div>
  );
}
export default CartUpdate;
