"use client";

import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export const DesktopNavLinks = ({ item, toggleSubLinks, productsOpen }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const isActive = () => {
    const categorySearch = searchParams.get("cat");

    if (item.path === pathName && !categorySearch) {
      return true;
    }
    if (item.path === "" && categorySearch) {
      return true;
    }
    if (item.path.startsWith("/products") && pathName.startsWith("/products")) {
      if (categorySearch && item.path.includes(categorySearch)) {
        return true;
      }
    }

    return false;
  };

  return (
    <Link
      prefetch={false}
      href={item.path}
      className={`${styles.container} ${isActive() ? styles.active : ""}`}
      onClick={toggleSubLinks}
    >
      {item.title}
      {productsOpen && item.subLinks ? (
        <ChevronUp />
      ) : (
        item.subLinks && <ChevronDown />
      )}
    </Link>
  );
};

export const MobileNavLinks = ({
  item,
  toggleMenu,
  toggleSubLinks,
  productsOpen,
  setProductsOpen,
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  function handleClick() {
    toggleMenu();
    window.scrollTo(0, 0);
    setProductsOpen(false);
  }

  const isActive = () => {
    const categorySearch = searchParams.get("cat");

    if (item.path === pathName && !categorySearch) {
      return true;
    }
    if (item.path === "" && categorySearch) {
      return true;
    }
    if (item.path.startsWith("/products") && pathName.startsWith("/products")) {
      if (categorySearch && item.path.includes(categorySearch)) {
        return true;
      }
    }

    return false;
  };

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${isActive() ? styles.active : ""} ${
        item.title === "Shop by Category" && styles.productsContainer
      }  `}
      onClick={item.subLinks ? toggleSubLinks : handleClick}
    >
      {item.title}
      {productsOpen && item.subLinks ? (
        <ChevronUp />
      ) : (
        item.subLinks && <ChevronDown />
      )}
    </Link>
  );
};
