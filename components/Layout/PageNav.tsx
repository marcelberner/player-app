import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { BiCompass } from "react-icons/bi";
import { RiLiveLine } from "react-icons/ri";

import styles from "./PageNav.module.scss";

interface navProps {
  state: boolean;
}

const PageNav: React.FC<navProps> = ({ state }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav className={styles.nav}>
      <h3 className={styles.label}>MENU</h3>
      <ul>
        <li>
          <Link
            href={"/"}
            className={`${styles.nav__item} ${
              currentRoute === "/" ? styles.active : ""
            } `}
          >
            <HiOutlineHome />
            {state && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link
            href={"/discovery"}
            className={`${styles.nav__item} ${
              currentRoute === "/discovery" ? styles.active : ""
            } `}
          >
            <BiCompass />
            {state && <span>Discovery</span>}
          </Link>
        </li>
        <li>
          <Link
            href={"/community"}
            className={`${styles.nav__item} ${
              currentRoute === "/community" ? styles.active : ""
            } `}
          >
            <HiOutlineUserGroup />
            {state && <span>Community</span>}
          </Link>
        </li>
        <li>
          <Link
            href={"/cinema"}
            className={`${styles.nav__item} ${
              currentRoute === "/cinema" ? styles.active : ""
            } `}
          >
            <RiLiveLine />
            {state && <span>Live cinema</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
