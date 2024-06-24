"use client";
import styles from "./counter.module.css";

function Counter({
  counter,
  decreaseProductCounter,
  increaseProductCounter,
  selectedVariant,
}) {
  return (
    <div className={styles.container}>
      <button disabled={counter === 1} onClick={decreaseProductCounter}>
        -
      </button>
      <p>{counter}</p>
      <button
        disabled={counter === selectedVariant.productVariantStock}
        onClick={() => {
          increaseProductCounter(selectedVariant.productVariantStock);
        }}
      >
        +
      </button>
    </div>
  );
}
export default Counter;
