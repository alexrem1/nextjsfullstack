import CartContainer from "@/components/cart/cartContainer/cartContainer";

export const metadata = {
  title: "Alexquisite Patisserie Cart Page",
  description:
    "Cart page where you can edit your cart by removing individual items or the entire cart and also checkout with items in the cart",
};
function Cart() {
  return <CartContainer />;
}

export default Cart;
