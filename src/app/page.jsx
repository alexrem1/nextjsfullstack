import Image from "next/image";
import styles from "./page.module.css";
import CategoriesContainer from "@/components/categories/categoriesContainer/categoriesContainer";

export const metadata = {
  title: "Alexquisite Patisserie Home Page",
  description: "Landing page",
};

async function Homepage() {
  return (
    <div className={styles.container}>
      <>
        <div className={styles.padding}>
          <CategoriesContainer />
        </div>
        <div className={styles.imgContainer}>
          <Image src="/landing.jpg" alt="hero" fill cover="true" priority />
          <div className={styles.overlay}>
            <h1 className={styles.heroText}>
              Welcome to Alexquisite Patisserie
            </h1>
            <p className={styles.subText}>Delight in every bite</p>
          </div>
        </div>
      </>
    </div>
  );
}
export default Homepage;
