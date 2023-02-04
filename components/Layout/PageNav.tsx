import React from "react";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { BiCompass } from "react-icons/bi";
import { RiLiveLine } from "react-icons/ri";

import styles from "./PageNav.module.scss";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <h3 className={styles.label}>MENU</h3>
      <ul>
        <li className={`${styles.nav__item} ${styles.active}`}>
          <HiOutlineHome />
          <span>Home</span>
        </li>
        <li className={`${styles.nav__item}`}>
          <BiCompass />
          <span>Discovery</span>
        </li>
        <li className={`${styles.nav__item}`}>
          <HiOutlineUserGroup />
          <span>Community</span>
        </li>
        <li className={`${styles.nav__item}`}>
          <RiLiveLine />
          <span>Live cinema</span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
