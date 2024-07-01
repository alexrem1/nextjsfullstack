import { Star } from "lucide-react";
import styles from "./reviewsAverage.module.css";
function ReviewsAverage({ reviews, toggleReviewComments }) {
  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };
  // Calculate average rating
  const averageRating = calculateAverageRating(reviews);

  // Generate star elements
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const fillPercentage = Math.min(1, Math.max(0, rating - index)) * 100;
      return (
        <div key={index} className={styles.reviewStarsContainer}>
          <Star className={styles.reviewStar} />
          <div
            className={styles.reviewStarCover}
            style={{ width: `${100 - fillPercentage}%` }}
          />
        </div>
      );
    });
  };
  return (
    <div className={styles.averageContainer}>
      {reviews.length > 0 ? (
        <div
          className={styles.reviewStarsContainer}
          onClick={toggleReviewComments}
        >
          {renderStars(averageRating)}
          <span>
            {reviews.length > 1
              ? ` ${reviews.length} reviews`
              : ` ${reviews.length} review`}
          </span>
        </div>
      ) : (
        <>
          {reviews.length === 0 ? (
            <div
              className={styles.reviewStarsContainer}
              style={{ height: "24px" }}
            ></div>
          ) : (
            <div className={styles.reviewStarsContainer}>
              {renderStars(averageRating)}
              <span>{reviews.length} reviews</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default ReviewsAverage;
