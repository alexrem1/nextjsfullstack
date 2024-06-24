"use client";
import React from "react";
import styles from "./footer.module.css";
import { Briefcase, Linkedin, Mail, PhoneCall } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const sendEmail = () => {
    const email = "wickzy123@hotmail.com";
    window.open(`mailto:${email}`);
  };

  const makePhoneCall = () => {
    window.open(`tel:+447534633664`);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.social}>
        <Mail onClick={sendEmail} />
        <PhoneCall onClick={makePhoneCall} />
        <Briefcase
          onClick={() => {
            window.location.href =
              "https://alexrem1.github.io/SASS-Project/dist/index.html";
          }}
        />
        <FontAwesomeIcon
          icon={faGithub}
          onClick={() => {
            window.location.href = "https://github.com/alexrem1";
          }}
        />
        <Linkedin
          onClick={() => {
            window.location.href = "https://www.linkedin.com/in/acr123/";
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
