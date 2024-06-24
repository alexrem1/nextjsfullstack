import { Star } from "lucide-react";
import styles from "./reviewsUI.module.css";
function ReviewsUI({ reviews, toggleReview, reviewOpen }) {
  // Function to count star ratings
  const countStarRatings = (reviews, star) => {
    return reviews.filter((review) => review.rating === star).length;
  };

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
    <div className={styles.innerContainer}>
      <div className={styles.averageContainer}>
        <div className={styles.reviewStarsContainer}>
          {renderStars(averageRating)}
          <span>{averageRating.toFixed(2)} out of 5</span>
        </div>
        <span>Based on {reviews.length} reviews</span>
      </div>
      <div className={styles.starRatingsOuterContainer}>
        {/* Loop through each star rating */}
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className={styles.starRatingsContainer}>
            {/* Display star rating */}

            <div className={styles.starRating}>
              {[...Array(5)].map((_, index) => {
                return (
                  <Star
                    key={index}
                    className={` ${
                      index + 1 > star ? styles.noStar : styles.star
                    } `}
                  />
                );
              })}
            </div>
            {/* Display filled stars */}
            <div className={styles.stars}>
              <div>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={styles.fill}
                    style={{
                      opacity: index + 1 > star ? "0.3" : "1", // Set opacity based on rating
                    }}
                  />
                ))}
              </div>

              {/* Display filled up bar */}
              <div
                className={styles.fill}
                style={{
                  width: `${
                    (countStarRatings(reviews, star) / reviews.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p>{countStarRatings(reviews, star)}</p>
          </div>
        ))}
      </div>
      <button onClick={toggleReview}>
        {reviewOpen ? "Cancel review" : "Write a review"}
      </button>
    </div>
  );
}
export default ReviewsUI;
