"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./categories.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function Categories({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sliderRef = useRef(null);

  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleCategoryClick = (category) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
      sliderRef.current.slickPlay();
    }

    const query = new URLSearchParams(searchParams);
    query.set("cat", category);
    query.delete("sort");
    query.delete("searchQuery");

    const searchParamsString = query.toString();
    router.push(`/products?${searchParamsString}`);
  };

  return (
    <div className={styles.sliderContainer}>
      <p>Shop by:</p>
      <Slider ref={sliderRef} {...settings}>
        {categories.map((category) => (
          <div key={category.productCat} className={styles.sliderItem}>
            <Link
              href={`/products?cat=${category.productCat}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleCategoryClick(category.productCat); // Use custom handler
              }}
            >
              {category.productCat}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Categories;
