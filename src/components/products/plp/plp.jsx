import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./plp.module.css";
import FilterCategory from "../filters/filterCategory";
import ReviewsAverage from "@/components/reviews/reviewsAverage/reviewsAverage";

function Plp({ products, searchParams }) {
  return (
    <div className={styles.container}>
      {products.map((product) => {
        return (
          <div key={product.productId} className={styles.individual}>
            <Link
              href={`/products/${product.productId}`}
              className={styles.linkTo}
            >
              <div
                className={`${styles.imgContainer} ${
                  product.productName === "Purple Macaron"
                    ? styles.position
                    : ""
                }`}
              >
                <Image
                  src={product.productImage}
                  alt={product.productName}
                  fill
                  priority
                />
              </div>
              <ReviewsAverage reviews={product.reviews} />
              <h3>{product.productName}</h3>

              {product.variants.length > 0 && (
                <div>
                  <p>
                    From:{" "}
                    <strong>
                      {" "}
                      £
                      {parseFloat(
                        product.variants[0].productVariantPrice
                      ).toFixed(2)}
                    </strong>
                  </p>
                </div>
              )}
            </Link>

            <FilterCategory product={product} searchParams={searchParams} />
          </div>
        );
      })}
    </div>
  );
}
export default Plp;
