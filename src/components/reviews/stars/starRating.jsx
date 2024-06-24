import React, { useState } from "react";
import { useController } from "react-hook-form";
import styles from "./starRating.module.css";
import { Star } from "lucide-react";

const StarRating = React.forwardRef(
  ({ control, name, defaultValue = 0 }, ref) => {
    const [hoverValue, setHoverValue] = useState(undefined);
    const { field } = useController({
      name,
      control,
      defaultValue,
    });

    const handleClick = (value) => {
      field.onChange(value);
    };

    const handleMouseOver = (value) => {
      setHoverValue(value);
    };

    const handleMouseLeave = () => {
      setHoverValue(undefined);
    };

    return (
      <div className={styles.starRating} ref={ref}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              className={
                starValue <= (hoverValue || field.value)
                  ? styles.filledStar
                  : styles.emptyStar
              }
              onClick={() => handleClick(starValue)}
              onMouseOver={() => handleMouseOver(starValue)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    );
  }
);

export default StarRating;
