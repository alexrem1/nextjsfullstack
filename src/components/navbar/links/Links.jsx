"use client";

import { Menu, X } from "lucide-react";
import { MobileNavLinks } from "./navLink/navLink";
import React, { useState } from "react";
import styles from "./links.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "@/app/authHelpers";

const Links = ({ categories }) => {
  const { data: session } = useSession();

  const links = [
    { title: "Home", path: "/" },
    { title: "Shop all Products", path: "/products" },
    {
      title: "Shop by Category",
      path: "",
      subLinks: categories.map((c) => ({
        title: c.productCat,
        path: `/products?cat=${c.productCat}`,
      })),
    },
  ];

  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const toggleProductsMenu = () => {
    setProductsOpen((prev) => !prev);
  };

  const renderMobileLinks = () => {
    return (
      <div className={styles.mobileLinks}>
        <h1>Alexquisite</h1>
        {links.map((link) => {
          return (
            <React.Fragment key={link.title}>
              <MobileNavLinks
                item={link}
                toggleMenu={toggleMenu}
                toggleSubLinks={
                  link.title === "Shop by Category" ? toggleProductsMenu : null
                }
                productsOpen={productsOpen}
                setProductsOpen={setProductsOpen}
                isMainLink={true}
              />
              {link.title === "Shop by Category" && productsOpen && (
                <div className={styles.subLinks}>
                  {link.subLinks.map((subLink) => (
                    <MobileNavLinks
                      key={subLink.title}
                      item={subLink}
                      toggleMenu={toggleMenu}
                      setProductsOpen={setProductsOpen}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}

        {session ? (
          <>
            <MobileNavLinks
              item={{ title: "My Account", path: "/account" }}
              toggleMenu={toggleMenu}
              setProductsOpen={setProductsOpen}
            />
            <button
              onClick={async () => {
                toggleMenu();
                setProductsOpen();
                await signOut({ redirect: false });
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <MobileNavLinks
              item={{ title: "Login", path: "/login" }}
              toggleMenu={toggleMenu}
              setProductsOpen={setProductsOpen}
            />
            <MobileNavLinks
              item={{ title: "Register", path: "/register" }}
              toggleMenu={toggleMenu}
              setProductsOpen={setProductsOpen}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <>
        <div
          className={`${styles.overlay} ${open ? styles.open : ""}`}
          onClick={toggleMenu}
        ></div>
        <div
          className={`${styles.mobileLinksContainer} ${
            open ? styles.open : ""
          }`}
        >
          <X onClick={toggleMenu} />
          {renderMobileLinks()}
        </div>
      </>
      <span className={styles.mobileMenuToggle}>
        <Menu onClick={toggleMenu} />
      </span>
    </div>
  );
};

export default Links;
