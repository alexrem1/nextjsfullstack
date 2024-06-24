import Pdp from "@/components/products/pdps/pdp";
import getProducts from "@/app/actions/products/getProducts";

export const generateMetadata = async ({ params }) => {
  const product = await getProducts(null, null, params.slug, null);

  return {
    title: `Alexquisite Patisserie ${product.productName} Page`,
    description: `${product.productDesc}`,
  };
};

async function SingleProductPage({ params, searchParams }) {
  const product = await getProducts(null, null, params.slug, null);

  if (!product) {
    // Handle the case when product data is loading
    return <div>Loading...</div>;
  }

  return <Pdp params={params} product={product} searchParams={searchParams} />;
}

export default SingleProductPage;
