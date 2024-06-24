"use client";

import { useRouter } from "next/navigation";
import styles from "./filterCategory.module.css";
import { Search } from "lucide-react";
function FilterCategory({ product, searchParams }) {
  const router = useRouter();
  return (
    <a
      className={styles.container}
      onClick={() => {
        const query = new URLSearchParams(searchParams);

        // Set the category parameter
        query.set("cat", product.productCat);
        // Remove the search query parameter
        query.delete("sort");
        // Remove the search query parameter
        query.delete("searchQuery");

        const searchParamsString = query.toString();
        router.push(`/products?${searchParamsString}`);
      }}
    >
      <Search /> {product.productCat}
    </a>
  );
}
export default FilterCategory;
