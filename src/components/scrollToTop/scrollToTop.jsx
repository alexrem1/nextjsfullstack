"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
