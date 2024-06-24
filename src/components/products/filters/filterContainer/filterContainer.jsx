"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import Filter from "../filter";
import styles from "./filterContainer.module.css";

function FilterContainer({ searchParams, sort }) {
  const [open, setOpen] = useState(false);

  function showFilters() {
    setOpen((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <div onClick={showFilters} className={styles.containerFilter}>
        <SlidersHorizontal />
        <p>Filters</p>
      </div>
      {/* no conditional rendering for transition */}
      {/* {open && ( */}
      <>
        <div
          className={`${styles.overlay} ${open ? styles.open : ""}`}
          onClick={showFilters}
        ></div>

        <div className={`${styles.filterContainer} ${open ? styles.open : ""}`}>
          <div className={styles.closeFilter}>
            <X onClick={showFilters} />
          </div>
          <Filter searchParams={searchParams} sort={sort} setOpen={setOpen} />
        </div>
      </>
      {/* )} */}
    </div>
  );
}
export default FilterContainer;
