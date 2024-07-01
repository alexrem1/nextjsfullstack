"use client";
import Image from "next/image";
import styles from "./pdp.module.css";
import FilterCategory from "../filters/filterCategory";
import AddToCartContainer from "@/components/cart/addToCartContainer/addToCartContainer";
import Accordion from "./accordion/accordion";
import Reviews from "@/components/reviews/reviews";
import ReviewsAverage from "@/components/reviews/reviewsAverage/reviewsAverage";
import { recommendations } from "@/app/actions/recommendations/recommendations";
import RecentlyBought from "@/components/recommendations/recentlyBought";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import React from "react";

function Pdp({ params, searchParams, product }) {
  const [rec, setRec] = useState([]);
  const [reviewCommentOpen, setReviewCommentOpen] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    async function fetchRecommendations() {
      const recData = await recommendations();
      setRec(recData);
    }

    fetchRecommendations();
  }, []);

  const toggleReviewComments = () => {
    setReviewCommentOpen(true);
    reviewsRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
          <ReviewsAverage
            reviews={product.reviews}
            toggleReviewComments={toggleReviewComments}
          />
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
      <div ref={reviewsRef}>
        <Reviews
          reviews={product.reviews}
          params={params}
          reviewCommentOpen={reviewCommentOpen}
          setReviewCommentOpen={setReviewCommentOpen}
        />
      </div>
    </>
  );
}
export default Pdp;
