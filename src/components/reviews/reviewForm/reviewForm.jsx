import styles from "./reviewForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postReview } from "@/app/actions/reviews/postReview";
import { useEffect } from "react";
import { useRef } from "react";
import { LucideMessageCircleWarning } from "lucide-react";
import StarRating from "../stars/starRating";

function ReviewForm({ setReviewOpen, setIsSubmitted, reviewOpen, params }) {
  const schema = yup.object().shape({
    rating: yup.number().required(),
    comment: yup
      .string()

      .required("Enter your comment."),
    name: yup.string().required("Enter your name."),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    await postReview(data, params.slug);
    setReviewOpen(false);
    setIsSubmitted(true);
  }

  const writeReviewContainerRef = useRef(null);

  useEffect(() => {
    if (reviewOpen && writeReviewContainerRef.current) {
      writeReviewContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reviewOpen]);

  return (
    <div className={styles.writeReviewContainer} ref={writeReviewContainerRef}>
      <h1>Write a review</h1>
      <form
        className={styles.writeReviewForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.writeReviewInput}>
          <p>Rating</p>
          <StarRating
            control={control}
            name="rating"
            ref={register("rating").ref}
          />
          {errors.rating && (
            <div className={styles.warningMessage}>
              <span className={styles.warningIcon}>
                <LucideMessageCircleWarning />
              </span>
              <p>Select a rating.</p>
            </div>
          )}
        </div>
        <div className={styles.writeReviewInput}>
          <p>Comment</p>
          <textarea
            type="text"
            {...register("comment")}
            placeholder="Write your comments here"
          />
          {errors.comment && (
            <div className={styles.warningMessage}>
              <span className={styles.warningIcon}>
                <LucideMessageCircleWarning />
              </span>
              <p>{errors.comment.message}</p>
            </div>
          )}
        </div>
        <div className={styles.writeReviewInput}>
          <p>Name</p>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name (public)"
          />
          {errors.name && (
            <div className={styles.warningMessage}>
              <span className={styles.warningIcon}>
                <LucideMessageCircleWarning />
              </span>
              <p>{errors.name.message}</p>
            </div>
          )}
        </div>
        <div className={styles.submission}>
          <button type="button" onClick={() => setReviewOpen((prev) => !prev)}>
            Cancel review
          </button>
          <button type="submit">Send review</button>
        </div>
      </form>
    </div>
  );
}
export default ReviewForm;
