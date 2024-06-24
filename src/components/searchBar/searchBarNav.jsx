"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./searchBarNav.module.css";
import { SearchIcon, X } from "lucide-react";

export default function SearchBarNav({ setShowSearch, showSearch }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    router.push(`/products?searchQuery=${query}`);
    setQuery("");
    setShowSearch(false);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${showSearch ? styles.open : ""}`}
        onClick={() => setShowSearch(false)}
      ></div>
      <div
        className={`${styles.searchBarContainer} ${
          showSearch ? styles.open : ""
        }`}
      >
        <div className={styles.searchBar}>
          <div className={styles.closeSearch}>
            <X onClick={() => setShowSearch(false)} />
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
            <button>
              <SearchIcon onClick={handleSearch} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
