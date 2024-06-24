import getCategories from "@/app/actions/products/getCategories";
import Categories from "../categories";

async function CategoriesContainer() {
  const categories = await getCategories();

  return <Categories categories={categories} />;
}
export default CategoriesContainer;
