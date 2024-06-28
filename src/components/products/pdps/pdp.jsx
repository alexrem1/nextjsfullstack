import Image from "next/image";
import styles from "./pdp.module.css";
import FilterCategory from "../filters/filterCategory";
import AddToCartContainer from "@/components/cart/addToCartContainer/addToCartContainer";
import Accordion from "./accordion/accordion";
import Reviews from "@/components/reviews/reviews";
import ReviewsAverage from "@/components/reviews/reviewsAverage/reviewsAverage";
import { recommendations } from "@/app/actions/recommendations/recommendations";
import RecentlyBought from "@/components/recommendations/recentlyBought";

async function Pdp({ params, searchParams, product }) {
  const rec = await recommendations();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src={product.productImage}
            alt={product.productName}
            fill
            priority
          />
        </div>
        <div className={styles.info}>
          <ReviewsAverage reviews={product.reviews} />
          <h3>{product.productName}</h3>

          <AddToCartContainer product={product} />

          <FilterCategory
            product={product}
            searchParams={searchParams}
            params={params}
          />
          <Accordion product={product} />
        </div>
      </div>
      <RecentlyBought recommendations={rec} />
      <Reviews reviews={product.reviews} params={params} />
    </>
  );
}
export default Pdp;
