"use client";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import SearchBarNav from "../searchBarNav";
import styles from "./searchBarNavContainer.module.css";

export default function SearchBarNavContainer() {
  const [showSearch, setShowSearch] = useState(false);
  console.log(showSearch);

  function handleSearchIconClick() {
    setShowSearch((prev) => !prev);
  }
  return (
    <>
      <div className={styles.searchNavContainer}>
        <span>
          <SearchIcon onClick={handleSearchIconClick} />
        </span>
        <p onClick={handleSearchIconClick}>Search....</p>
      </div>

      <SearchBarNav setShowSearch={setShowSearch} showSearch={showSearch} />
    </>
  );
}
