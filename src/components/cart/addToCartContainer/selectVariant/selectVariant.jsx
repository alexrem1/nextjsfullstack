import React from "react";
import styles from "./selectVariant.module.css"; // Assuming you have a CSS module for styling

function SelectVariant({
  product,
  setSelectedVariant,
  setCounter,
  selectedVariant,
  setAddMessage,
}) {
  const handleChange = (variantId) => {
    const selected = product.variants.find(
      (variant) => variant.productVariantId === variantId
    );
    setSelectedVariant(selected);
    setCounter(1); // Reset the counter whenever a new variant is selected
    setAddMessage("");
  };

  return (
    <div className={styles.variantContainer}>
      {product.variants.map((variant) => (
        <button
          key={variant.productVariantId}
          onClick={() => handleChange(variant.productVariantId)}
          className={
            selectedVariant.productVariantId === variant.productVariantId
              ? styles.active
              : ""
          }
        >
          {variant.productVariantName}
        </button>
      ))}
    </div>
  );
}

export default SelectVariant;
