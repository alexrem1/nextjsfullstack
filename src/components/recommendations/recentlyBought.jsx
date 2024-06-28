"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./recentlyBought.module.css";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReviewsAverage from "../reviews/reviewsAverage/reviewsAverage";

function RecentlyBought({ recommendations }) {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowRight
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowLeft
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>Recently Purchased</h1>
      <Slider {...settings} className={styles.slider}>
        {recommendations.map((recent) => (
          <div key={recent.productId}>
            <Link href={`/products/${recent.productId}`}>
              <div className={styles.imgContainer}>
                <Image
                  src={recent.productImage}
                  alt={recent.productImage}
                  fill
                  priority
                />
              </div>
              <h3>{recent.productName}</h3>
              <ReviewsAverage reviews={recent.reviews} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecentlyBought;
