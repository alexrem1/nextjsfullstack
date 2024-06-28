"use client";

import Counter from "./counter/counter";
import SelectVariant from "./selectVariant/selectVariant";
import Availability from "./availability/availability";
import HandleAddToCart from "./handleAddToCart/handleAddToCart";
import styles from "./addToCartContainer.module.css";
import { useCart } from "@/app/contexts/cartContext";
import { useEffect } from "react";

function AddToCartContainer({ product }) {
  const {
    selectedVariant,
    counter,
    setProductVariant,
    setSelectedVariant,
    setCounter,
    decreaseProductCounter,
    increaseProductCounter,
    handleAddToCart,
    availability,
    setPrice,
    setErrorMessage,
    addMessage,
  } = useCart();

  useEffect(() => {
    setCounter(1);
    setProductVariant(product);
  }, []);

  if (!selectedVariant) return <div>Loading...</div>;
  const stock = availability(selectedVariant.productVariantStock, counter);
  const price = setPrice(counter, selectedVariant.productVariantPrice);

  return (
    <div className={styles.container}>
      <div>
        {selectedVariant.productOriginalPrice ? (
          <>
            <h5 className={styles.ogPrice}>
              £{selectedVariant.productOriginalPrice}
            </h5>
            <h3 className={styles.discount}>£{price}</h3>
          </>
        ) : (
          <h4>£{price}</h4>
        )}
      </div>

      <SelectVariant
        setAddMessage={setErrorMessage}
        setSelectedVariant={setSelectedVariant}
        product={product}
        setCounter={setCounter}
        selectedVariant={selectedVariant}
      />
      <Counter
        counter={counter}
        decreaseProductCounter={decreaseProductCounter}
        increaseProductCounter={increaseProductCounter}
        selectedVariant={selectedVariant}
      />
      <Availability
        availability={stock}
        selectedVariant={selectedVariant}
        product={product}
      />
      <HandleAddToCart
        handleAddToCart={handleAddToCart}
        product={product}
        addMessage={addMessage}
      />
    </div>
  );
}
export default AddToCartContainer;
