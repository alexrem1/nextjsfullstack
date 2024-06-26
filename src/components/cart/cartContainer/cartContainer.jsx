"use client";
import { useCart } from "@/app/contexts/cartContext";
import CartItem from "./cartItem/cartItem";
import getStripe from "@/lib/stripe";
import { checkoutSession } from "@/app/actions/checkout/checkoutSession";
import { useEffect, useState } from "react";
import styles from "./cartContainer.module.css";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

function CartContainer() {
  const {
    cart,
    removeProductFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    totalPrice,
    availability,
    deliveryOption,
    setDeliveryOption,
    deliveryCost,
    clearCart,
    TotalIncDeliveryCost,
  } = useCart();

  const requestData = {
    items: cart.map(({ product, selectedVariant, quantity }) => ({
      productName: product.productName,
      productImage: product.productImage,
      productVariantPrice: selectedVariant.productVariantPrice,
      productVariantName: selectedVariant.productVariantName,
      quantity,
    })),
  };

  const [isCheckout, setIsCheckout] = useState(false);
  const handleCheckout = async () => {
    setIsCheckout(true);
    const sessionId = await checkoutSession(
      requestData,
      window.location.origin,
      deliveryCost,
      deliveryOption
    );

    const stripe = await getStripe();
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
      setIsCheckout(false);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  useEffect(() => {
    if (totalPrice < 24.99) {
      setDeliveryOption(deliveryOption);
    }
    if (deliveryOption === "free" && totalPrice < 24.99) {
      setDeliveryOption("standard");
    }
    if (totalPrice >= 24.99) {
      setDeliveryOption("free");
    }
  }, [totalPrice, setDeliveryOption, deliveryOption]);

  return (
    <div
      className={`${
        cart.length === 0 ? styles.emptyCart : styles.overallContainer
      }`}
    >
      {cart.length === 0 && (
        <>
          <p>Your cart is empty!</p>
          <Link href="/products" prefetch={false}>
            Continue Shopping
          </Link>
        </>
      )}
      <div className={styles.container}>
        {cart.length > 0 && (
          <>
            {cart.map(({ product, selectedVariant, quantity }) => (
              <CartItem
                key={selectedVariant.productVariantId}
                product={product}
                selectedVariant={selectedVariant}
                quantity={quantity}
                removeProductFromCart={removeProductFromCart}
                increaseItemQuantity={increaseItemQuantity}
                decreaseItemQuantity={decreaseItemQuantity}
                availability={availability}
              />
            ))}
            <div className={styles.notification}>
              <div className={styles.encouragement}>
                <p>
                  For testing purposes, our Stripe payment processor is
                  currently in test mode. Use the card number 4242 4242 4242
                  4242 for all transactions. Any other card number, including
                  your own personal card, will not be accepted and will be
                  blocked by Stripe.
                </p>
              </div>
            </div>

            <div className={styles.deliveryContainer}>
              <>
                <div className={styles.notification}>
                  {totalPrice >= 24.99 ? (
                    <div className={styles.qualified}>
                      <CheckCircle className={styles.icon} />
                      <p>You{"'"}ve qualified for free delivery!</p>
                    </div>
                  ) : (
                    <div className={styles.encouragement}>
                      <AlertCircle className={styles.icon} />
                      <p>
                        Spend £{(24.99 - totalPrice).toFixed(2)} to get free
                        delivery!
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.delivery}>
                  <div className={styles.cost}>
                    <h4>Subtotal: £{totalPrice.toFixed(2)}</h4>
                    <h4>Delivery: £{deliveryCost.toFixed(2)}</h4>
                    <h4>Total: £{TotalIncDeliveryCost}</h4>
                  </div>
                  <div className={styles.shipping}>
                    <label
                      className={` ${
                        deliveryOption === "free" && totalPrice >= 24.99
                          ? styles.active
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        value="free"
                        disabled={totalPrice < 24.99}
                        checked={
                          deliveryOption === "free" && totalPrice >= 24.99
                        }
                        onChange={() =>
                          totalPrice >= 24.99 && setDeliveryOption("free")
                        }
                      />
                      Free Delivery (Orders over £24.99)
                    </label>
                    <label
                      className={` ${
                        deliveryOption === "standard" ? styles.active : ""
                      }`}
                    >
                      <input
                        disabled={totalPrice >= 24.99}
                        type="radio"
                        value="standard"
                        checked={deliveryOption === "standard"}
                        onChange={() => setDeliveryOption("standard")}
                      />
                      Standard Delivery (£5)
                    </label>
                    <label
                      className={` ${
                        deliveryOption === "express" ? styles.active : ""
                      }`}
                    >
                      <input
                        disabled={totalPrice >= 24.99}
                        type="radio"
                        value="express"
                        checked={deliveryOption === "express"}
                        onChange={() => setDeliveryOption("express")}
                      />
                      Express Delivery (£10)
                    </label>
                  </div>
                </div>
                <div className={styles.checkoutBtns}>
                  <button onClick={handleClearCart}>Clear Cart</button>
                  <button disabled={isCheckout} onClick={handleCheckout}>
                    {isCheckout
                      ? "Loading Secure Stripe Checkout..."
                      : "Checkout"}
                  </button>
                </div>
              </>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartContainer;
