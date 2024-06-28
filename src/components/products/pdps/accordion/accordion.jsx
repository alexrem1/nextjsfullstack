"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./accordion.module.css"; // Create a CSS module for styling

const Accordion = ({ product }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null); // Close the section if it's already open
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className={styles.accordionContainer}>
      {[
        "Description",
        "Allergy Information",
        "FAQs",
        "Shipping & Returns",
        "Disclaimer",
      ].map((title, index) => (
        <div key={index} className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => toggleSection(title)}
          >
            <span>{title}</span>
            {openSection === title ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSection === title && (
            <div className={styles.accordionContent}>
              {title === "Description" && <p>{product.productDesc}</p>}
              {title === "Allergy Information" && (
                <p>May contain traces of nuts.</p>
              )}
              {title === "FAQs" && (
                <>
                  <p>
                    How do I place an order? - Simply browse our selection, add
                    your favorite treats to your cart, and proceed to checkout.
                    It{"'"}s that easy!
                  </p>
                  <p>
                    Do you offer customization options? - No but we do offer
                    discounts of up to 35% if you purchase the bundle variant of
                    certain products.
                  </p>
                  <p>
                    What payment methods do you accept? - We accept all major
                    credit cards, as well as PayPal, Apple Pay, and Google Pay.
                  </p>
                  <p>
                    What is your return policy? - Unfortunately, due the nature
                    of the products sold, we are unable to accept refunds.
                  </p>
                </>
              )}
              {title === "Shipping & Returns" && (
                <>
                  <p>
                    Express - Next Working Day Delivery: Need your treats in a
                    hurry? Opt for our Express Next Working Day Delivery service
                    for lightning-fast shipping straight to your door.
                  </p>
                  <p>
                    Standard - 3-5 Day Delivery: Enjoy reliable shipping with
                    our Standard 3-5 Day Delivery option. Your order will be
                    carefully packaged and dispatched within 24 hours, arriving
                    at your doorstep within 3 to 5 business days.
                  </p>
                  <p>
                    Free Delivery (Standard): Indulge guilt-free with our Free
                    Standard Delivery on all orders over £24.99. Sit back,
                    relax, and let us take care of the shipping costs while you
                    enjoy your delicious treats.
                  </p>
                  <p>
                    Returns policy: We don{"'"}t offer returns due to the nature
                    of the products.
                  </p>
                </>
              )}
              {title === "Disclaimer" && (
                <p>
                  Disclaimer: All information provided is for informational
                  purposes only.
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
