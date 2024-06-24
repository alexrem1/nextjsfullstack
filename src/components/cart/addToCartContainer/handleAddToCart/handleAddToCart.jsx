"use client";
import styles from "./handleAddToCart.module.css";

function HandleAddToCart({ handleAddToCart, product, addMessage }) {
  return (
    <div className={styles.container}>
      <button
        disabled={addMessage}
        className={styles.addToCartButton}
        onClick={() => {
          handleAddToCart(product);
        }}
      >
        {addMessage ? addMessage : "Add to Cart"}
      </button>
    </div>
  );
}
export default HandleAddToCart;
