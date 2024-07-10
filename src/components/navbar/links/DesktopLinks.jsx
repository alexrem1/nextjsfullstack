"use client";

import { DesktopNavLinks } from "./navLink/navLink";
import React from "react";
import styles from "./desktopLinks.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "@/app/authHelpers";

const DesktopLinks = () => {
  const { data: session } = useSession();

  const links = [
    { title: "Home", path: "/" },

    { title: "Shop all Products", path: "/products" },
  ];

  const renderDesktopLinks = () => {
    return (
      <>
        {links.map((link) => {
          return (
            <React.Fragment key={link.title}>
              <DesktopNavLinks item={link} />
            </React.Fragment>
          );
        })}

        {session && (
          <DesktopNavLinks item={{ title: "My Account", path: "/account" }} />
        )}
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
