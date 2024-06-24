"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./cartItem.module.css";
import { LucideMessageCircleWarning } from "lucide-react";
function CartItem({
  product,
  selectedVariant,
  quantity,
  removeProductFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  availability,
}) {
  const stock = availability(selectedVariant.productVariantStock, quantity);
  return (
    <div key={selectedVariant.productVariantId} className={styles.container}>
      <div className={styles.imgContainer}>
        <Link href={`/products/${product.productId}`}>
          <Image
            src={product.productImage}
            alt={product.productName}
            fill
            priority
          />
        </Link>
      </div>
      <div className={styles.info}>
        <h3>
          {product.productName} - {selectedVariant.productVariantName}
        </h3>
        <strong>
          <p>
            £
            {parseFloat(quantity * selectedVariant.productVariantPrice).toFixed(
              2
            )}
          </p>
        </strong>
        <div className={styles.counterContainer}>
          <button
            disabled={quantity === 1}
            onClick={() =>
              decreaseItemQuantity(selectedVariant.productVariantId)
            }
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() =>
              increaseItemQuantity(
                selectedVariant.productVariantId,
                selectedVariant.productVariantStock
              )
            }
            disabled={quantity === selectedVariant.productVariantStock}
          >
            +
          </button>
        </div>
        {stock === 0 && (
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

        <button
          onClick={() =>
            removeProductFromCart(selectedVariant.productVariantId)
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
