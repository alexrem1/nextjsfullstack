"use client";
import React from "react";
import styles from "./reviews.module.css";
import { useState } from "react";
import ReviewSubmitted from "./reviewSubmitted/reviewSubmitted";
import ReviewForm from "./reviewForm/reviewForm";
import ReviewsUI from "./reviewsUI/reviewsUI";
import ReviewComments from "./reviewComments/reviewComments";

const Reviews = ({
  reviews,
  params,
  reviewCommentOpen,
  setReviewCommentOpen,
}) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const toggleReview = () => {
    setReviewOpen((prev) => !prev);
    setIsSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <h1>Customer Reviews</h1>
      <ReviewsUI
        toggleReview={toggleReview}
        reviews={reviews}
        reviewOpen={reviewOpen}
        setSelectedRating={setSelectedRating}
        reviewCommentOpen={reviewCommentOpen}
        setReviewCommentOpen={setReviewCommentOpen}
        selectedRating={selectedRating}
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
      <ReviewComments
        reviews={reviews}
        reviewCommentOpen={reviewCommentOpen}
        selectedRating={selectedRating}
      />
    </div>
  );
};

export default Reviews;
