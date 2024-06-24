"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./desktopFilter.module.css";

function DesktopFilter({ searchParams, sort }) {
  const router = useRouter();
  const query = new URLSearchParams(searchParams);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (selectedSort) => {
    if (selectedSort) {
      query.set("sort", selectedSort);
    } else {
      query.delete("sort");
    }

    const searchParamsString = query.toString();
    router.push(`/products?${searchParamsString}`);

    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <button
          className={`${styles.dropdownButton} ${
            isDropdownOpen ? styles.open : ""
          }`}
          onClick={toggleDropdown}
        >
          {(sort === "default" || sort === "" || !query.get("sort")) &&
            "Name: A-Z (default)"}
          {sort === "nameDesc" && "Name: Z-A"}
          {sort === "priceAsc" && "Price: Low to High"}
          {sort === "priceDesc" && "Price: High to Low"}
          {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {/* {isDropdownOpen && ( */}
        <div
          className={`${styles.dropdownContent}  ${
            isDropdownOpen ? styles.open : ""
          }`}
        >
          <label>
            <input
              hidden={true}
              type="radio"
              value="default"
              checked={sort === "default" || !query.get("sort")}
              onChange={() => handleSortChange("default")}
            />
            Name: A-Z (default)
          </label>
          <label>
            <input
              hidden={true}
              type="radio"
              value="nameDesc"
              checked={sort === "nameDesc"}
              onChange={() => handleSortChange("nameDesc")}
            />
            Name: Z-A
          </label>
          <label>
            <input
              hidden={true}
              type="radio"
              value="priceAsc"
              checked={sort === "priceAsc"}
              onChange={() => handleSortChange("priceAsc")}
            />
            Price: Low to High
          </label>
          <label>
            <input
              hidden={true}
              type="radio"
              value="priceDesc"
              checked={sort === "priceDesc"}
              onChange={() => handleSortChange("priceDesc")}
            />
            Price: High to Low
          </label>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default DesktopFilter;
