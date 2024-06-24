import CategoriesContainer from "@/components/categories/categoriesContainer/categoriesContainer";
import PlpContainer from "@/components/products/plp/plpContainer/plpContainer";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/loadingSkeleton";
import styles from "./page.module.css";

export const metadata = {
  title: "Alexquisite Patisserie Products Listing Page",
  description: "All products can be found here",
};

async function ProductListingPage({ searchParams }) {
  return (
    <div className={styles.container}>
      <CategoriesContainer />
      <Suspense key={searchParams} fallback={<LoadingSkeleton />}>
        <PlpContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
export default ProductListingPage;
