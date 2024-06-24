import Image from "next/image";
import styles from "./page.module.css";
import CategoriesContainer from "@/components/categories/categoriesContainer/categoriesContainer";

export const metadata = {
  title: "Alexquisite Patisserie Home Page",
  description: "Landing page",
};

// async function fetchUsers() {
//   const res = await fetch("http://localhost:3000/api/getdata");
//   if (!res.ok) {
//     throw new Error("Failed to fetch users");
//   }
//   return res.json();
// }
async function Homepage() {
  // const check = await fetchUsers();
  // console.log(check, "this the api route");
  return (
    <div className={styles.container}>
      <CategoriesContainer />
      <h1 className={`${styles.homedog} homedog`}>This is the home page</h1>
      <div className={styles.imgContainer}>
        <Image src="/choc_croissant.jpg" alt="hero" fill priority />
      </div>
    </div>
  );
}
export default Homepage;
