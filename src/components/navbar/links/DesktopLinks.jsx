"use client";

import { DesktopNavLinks } from "./navLink/navLink";
import React, { useState } from "react";
import styles from "./desktopLinks.module.css";

const DesktopLinks = () => {
  const links = [
    { title: "Home", path: "/" },

    { title: "Shop all Products", path: "/products" },
  ];

  const [productsOpen, setProductsOpen] = useState(false);

  const toggleProductsMenu = () => {
    setProductsOpen((prev) => !prev);
  };

  const renderDesktopLinks = () => {
    return (
      <>
        {links.map((link) => {
          return (
            <React.Fragment key={link.title}>
              <DesktopNavLinks
                item={link}
                toggleSubLinks={
                  link.title === "Shop by Category" ? toggleProductsMenu : null
                }
                productsOpen={productsOpen}
              />
            </React.Fragment>
          );
        })}

        {/* {authenticated ? (
          <>
            {isAdmin && (
              <DesktopNavLinks item={{ title: "Admin", path: "/admin" }} />
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <DesktopNavLinks item={{ title: "Login", path: "/login" }} />
        )} */}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.desktopLinks}>{renderDesktopLinks()}</div>
    </div>
  );
};

export default DesktopLinks;
