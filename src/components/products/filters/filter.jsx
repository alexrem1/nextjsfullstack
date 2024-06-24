"use client";

import { useRouter } from "next/navigation";
import styles from "./filter.module.css";

function Filter({ searchParams, sort, setOpen }) {
  const router = useRouter();
  const query = new URLSearchParams(searchParams);

  const handleSortChange = (selectedSort) => {
    if (selectedSort) {
      query.set("sort", selectedSort);
    } else {
      query.delete("sort");
    }

    const searchParamsString = query.toString();
    router.push(`/products?${searchParamsString}`);

    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <h1>Filters</h1>
      <p>Sort By: </p>
      <label>
        <input
          type="radio"
          value="default"
          checked={sort === "default" || !query.get("sort")}
          onChange={() => handleSortChange("default")}
        />
        Name: A-Z (default)
      </label>
      <label>
        <input
          type="radio"
          value="nameDesc"
          checked={sort === "nameDesc"}
          onChange={() => handleSortChange("nameDesc")}
        />
        Name: Z-A
      </label>
      <label>
        <input
          type="radio"
          value="priceAsc"
          checked={sort === "priceAsc"}
          onChange={() => handleSortChange("priceAsc")}
        />
        Price: Low to High
      </label>
      <label>
        <input
          type="radio"
          value="priceDesc"
          checked={sort === "priceDesc"}
          onChange={() => handleSortChange("priceDesc")}
        />
        Price: High to Low
      </label>
    </div>
  );
}

export default Filter;
