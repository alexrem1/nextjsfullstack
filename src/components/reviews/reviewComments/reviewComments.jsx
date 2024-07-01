import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import styles from "./reviewComments.module.css";

function ReviewComments({ reviewCommentOpen, selectedRating, reviews }) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [currentReviews, setCurrentReviews] = useState([]);

  const reviewCommentsRef = useRef(null);

  useEffect(() => {
    const filterReviews = selectedRating
      ? reviews.filter((review) => review.rating === selectedRating)
      : reviews;
    setFilteredReviews(filterReviews);
    setCurrentPage(1);
  }, [selectedRating, reviews]);

  useEffect(() => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviewsSlice = filteredReviews.slice(
      indexOfFirstReview,
      indexOfLastReview
    );
    setCurrentReviews(currentReviewsSlice);

    if (reviewCommentOpen && reviewCommentsRef.current) {
      reviewCommentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage, filteredReviews, reviewCommentOpen]);

  const renderStars = (rating) => {
    return [...Array(selectedRating ? selectedRating : 5)].map((_, index) => (
      <Star
        key={index}
        className={index < rating ? styles.filledStar : styles.emptyStar}
      />
    ));
  };

  return (
    <>
      {reviewCommentOpen && (
        <div className={styles.reviewComments} ref={reviewCommentsRef}>
          {currentReviews.length > 0 ? (
            <>
              {currentReviews.map((review) => (
                <div key={review.reviewsId} className={styles.review}>
                  <div className={styles.starRating}>
                    {renderStars(review.rating)}
                  </div>
                  <div className={styles.date}>
                    <h3>
                      <strong>{review.name}</strong>
                    </h3>
                    <p>
                      <strong>{review.date}</strong>
                    </p>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.review}>
              <p>
                <strong>No reviews</strong>
              </p>
            </div>
          )}
        </div>
      )}
      {reviewCommentOpen && currentReviews.length > 0 && (
        <div className={styles.pagination}>
          {Array.from({
            length: Math.ceil(filteredReviews.length / reviewsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={index + 1 === currentPage ? styles.active : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default ReviewComments;
