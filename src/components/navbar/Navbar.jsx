import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { ShoppingCart } from "lucide-react";
import CartUpdate from "./cartUpdate/cartUpdate";
import SearchBarNavContainer from "../searchBar/searchBarNavContainer/searchBarNavContainer";
import getCategories from "@/app/actions/products/getCategories";
import DesktopLinks from "./links/DesktopLinks";

async function Navbar() {
  const categories = await getCategories();

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <Links categories={categories} />
        <SearchBarNavContainer />
      </div>
      <div className={styles.middle}>
        <h1>
          <Link href="/"> Alexquisite</Link>
        </h1>
      </div>

      <div className={styles.right}>
        <Link href="/cart">
          <CartUpdate />
          <ShoppingCart />
        </Link>
      </div>
      <DesktopLinks categories={categories} />
    </nav>
  );
}
export default Navbar;
