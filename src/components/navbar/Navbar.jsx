import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { ShoppingCart, User } from "lucide-react";
import CartUpdate from "./cartUpdate/cartUpdate";
import SearchBarNavContainer from "../searchBar/searchBarNavContainer/searchBarNavContainer";
import getCategories from "@/app/actions/products/getCategories";
import DesktopLinks from "./links/DesktopLinks";
import { getSession } from "@/lib/getSession";
import ClientLogoutButton from "@/components/clientLogoutButton/clientLogoutButton";

async function Navbar() {
  const categories = await getCategories();
  const session = await getSession();

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
        <div className={styles.logD}>
          {session ? <ClientLogoutButton /> : <Link href="/login">Login</Link>}
        </div>
        <Link className={styles.logM} href={session ? "/account" : "/login"}>
          <User />
        </Link>
        <Link className={styles.cart} href="/cart">
          <CartUpdate />
          <ShoppingCart />
        </Link>
      </div>
      <DesktopLinks categories={categories} />
    </nav>
  );
}
export default Navbar;
