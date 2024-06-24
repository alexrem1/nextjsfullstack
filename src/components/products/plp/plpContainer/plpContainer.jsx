import React from "react";
import getProducts from "@/app/actions/products/getProducts";
import Plp from "../plp";
import FilterContainer from "../../filters/filterContainer/filterContainer";
import styles from "./plpContainer.module.css";
import DesktopFilter from "../../filters/desktopFilter/desktopFilter";

async function PlpContainer({ searchParams }) {
  const category = searchParams.cat || null;
  const sort = searchParams.sort || null;
  const searchQuery = searchParams.searchQuery || null;
  const products = await getProducts(category, sort, null, searchQuery);

  if (!products) {
    // Handle the error case here
    return <div>Error loading products. Please try again later.</div>;
  }
  return (
    <>
      {!searchParams.searchQuery ? (
        <>
          <div className={styles.filterResults}>
            <FilterContainer searchParams={searchParams} sort={sort} />
            <DesktopFilter searchParams={searchParams} sort={sort} />
            <p>{products.length} Results</p>{" "}
          </div>
          <Plp products={products} searchParams={searchParams} />
        </>
      ) : searchParams.searchQuery && products.length > 0 ? (
        <>
          <div className={styles.filterResults}>
            <FilterContainer searchParams={searchParams} sort={sort} />
            <DesktopFilter searchParams={searchParams} sort={sort} />
            {products.length === 1 ? (
              <p>{products.length} result</p>
            ) : (
              products.length > 1 && <p>{products.length} results</p>
            )}
          </div>

          <Plp products={products} searchParams={searchParams} />
        </>
      ) : (
        <div className={styles.noResults}>
          <p>
            Your search for &quot;{searchParams.searchQuery}&quot; did not yield
            any results.
          </p>
        </div>
      )}
    </>
  );
}
export default PlpContainer;
