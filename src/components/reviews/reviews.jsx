"use client";
import React from "react";
import styles from "./reviews.module.css";
import { useState } from "react";
import ReviewSubmitted from "./reviewSubmitted/reviewSubmitted";
import ReviewForm from "./reviewForm/reviewForm";
import ReviewsUI from "./reviewsUI/reviewsUI";

const Reviews = ({ reviews, params }) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleReview = () => {
    setReviewOpen((prev) => {
      return !prev;
    });
    setIsSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <h1>Customer Reviews</h1>
      <ReviewsUI
        toggleReview={toggleReview}
        reviews={reviews}
        reviewOpen={reviewOpen}
      />
      {reviewOpen && (
        <ReviewForm
          params={params}
          setIsSubmitted={setIsSubmitted}
          setReviewOpen={setReviewOpen}
          reviewOpen={reviewOpen}
        />
      )}
      <ReviewSubmitted isSubmitted={isSubmitted} />
    </div>
  );
};

export default Reviews;
