import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavItem.module.scss";

interface navProps {
  link: string;
  icon: any;
  text: string;
  state: boolean;
}

const NavItem: React.FC<navProps> = ({ icon, link, text, state }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <li>
      <Link
        href={link}
        className={`${styles.nav_item} ${
          currentRoute === link ? styles.active : ""
        } `}
      >
        {icon}
        {state && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default NavItem;
