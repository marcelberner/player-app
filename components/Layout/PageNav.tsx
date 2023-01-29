import React from "react";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineHeart,
} from "react-icons/hi";
import { BiCalendar, BiCompass } from "react-icons/bi";
import { RiLiveLine } from "react-icons/ri";

import styles from "./PageNav.module.scss";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <h3 className={styles.label}>Przeglądaj</h3>
      <ul>
        <li className={`${styles.nav__item} ${styles.active}`}>
          <HiOutlineHome />
          <span>Home</span>
        </li>
        <li className={`${styles.nav__item}`}>
          <BiCompass />
          <span>Odkrywaj</span>
        </li>
        <li className={`${styles.nav__item}`}>
          <HiOutlineUserGroup />
          <span>Społeczność</span>
        </li>
        <li className={`${styles.nav__item}`}>
          <RiLiveLine />
          <span>Super kino</span>
        </li>
        {/* <li className={styles.nav__item}>
          <HiOutlineHeart />
          <span>Do obejrzenia</span>
        </li>
        <li className={styles.nav__item}>
          <BiCalendar />
          <span>Repertuar</span>
        </li> */}
      </ul>
    </nav>
  );
};

export default PageNav;
