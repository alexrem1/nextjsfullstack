"use client";
import { Check } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("standard"); // default to standard delivery
  const [addMessage, setAddMessage] = useState("");

  const deliveryThreshold = 24.99; // Example threshold
  const deliveryPrices = {
    standard: 5,
    express: 10,
    free: 0,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = ({ product, selectedVariant, quantity }) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.productId === product.productId &&
          item.selectedVariant.productVariantId ===
            selectedVariant.productVariantId
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingItemIndex].quantity + quantity;

        if (newQuantity > selectedVariant.productVariantStock) {
          setErrorMessage(
            `You already have ${updatedCart[existingItemIndex].quantity} ${selectedVariant.productVariantName} ${product.productName}'s in your basket. We only make ${selectedVariant.productVariantStock} ${selectedVariant.productVariantName} ${product.productName}'s per order.`
          );
          return prevCart;
        } else {
          setAddMessage(<Check />);
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        }
      } else {
        setAddMessage(<Check />);

        return [...prevCart, { product, selectedVariant, quantity }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeProductFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.selectedVariant.productVariantId !== productId
      );
      return updatedCart;
    });
  };

  const increaseItemQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.selectedVariant.productVariantId === productId &&
          item.quantity < item.selectedVariant.productVariantStock
        ) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  };

  const decreaseItemQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.selectedVariant.productVariantId === productId &&
          item.quantity > 1
        ) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
    );
  };

  const totalPrice = cart.reduce((acc, { selectedVariant, quantity }) => {
    return acc + quantity * parseFloat(selectedVariant.productVariantPrice);
  }, 0);

  // const TwoDecimalsTotalPrice = parseFloat(totalPrice.toFixed(2));

  const deliveryCost =
    totalPrice >= deliveryThreshold
      ? deliveryPrices.free
      : deliveryPrices[deliveryOption];

  const TotalIncDeliveryCost = (deliveryCost + totalPrice).toFixed(2);

  // console.log(TotalIncDeliveryCost, TwoDecimalsTotalPrice);

  const availability = (stock, quantity) => {
    return stock - quantity;
  };

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [counter, setCounter] = useState(1);

  const setProductVariant = (product) => {
    setSelectedVariant(product.variants[0]);
    setErrorMessage("");
  };

  const decreaseProductCounter = () => {
    if (counter > 1) {
      setErrorMessage("");
      setCounter((prev) => prev - 1);
    }
  };
  const increaseProductCounter = (stock) => {
    if (counter < stock) {
      setErrorMessage("");
      setCounter((prev) => prev + 1);
    }
  };
  const handleAddToCart = (product) => {
    addToCart({ product, selectedVariant, quantity: counter });
    setCounter(1);
  };

  const setPrice = (counter, selectedVariant) => {
    return (counter * parseFloat(selectedVariant)).toFixed(2);
  };

  setTimeout(() => {
    setAddMessage("");
  }, 1000);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeProductFromCart,
        clearCart,
        errorMessage,
        setErrorMessage,
        increaseItemQuantity,
        decreaseItemQuantity,
        totalPrice,
        deliveryOption,
        setDeliveryOption,
        deliveryCost,
        availability,
        TotalIncDeliveryCost,
        //ATC
        selectedVariant,
        setSelectedVariant,
        counter,
        setCounter,
        setProductVariant,
        decreaseProductCounter,
        increaseProductCounter,
        handleAddToCart,
        setPrice,
        addMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
