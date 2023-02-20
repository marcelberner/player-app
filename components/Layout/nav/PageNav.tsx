import React from "react";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { BiCompass } from "react-icons/bi";
import { RiLiveLine } from "react-icons/ri";

import styles from "./PageNav.module.scss";

import NavItem from "./NavItem";

interface navProps {
  state: boolean;
}

const NAV_ITEMS = [
  {
    link: "/",
    icon: <HiOutlineHome />,
    text: "Home",
  },
  {
    link: "/discovery",
    icon: <BiCompass />,
    text: "Discovery",
  },
  {
    link: "/community",
    icon: <HiOutlineUserGroup />,
    text: "Community",
  },
  {
    link: "/cinema",
    icon: <RiLiveLine />,
    text: "Live cinema",
  },
];

const PageNav: React.FC<navProps> = ({ state }) => {
  return (
    <nav className={styles.nav}>
      <h3 className={styles.label}>MENU</h3>
      <ul>
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={index}
            text={item.text}
            link={item.link}
            icon={item.icon}
            state={state}
          />
        ))}
      </ul>
    </nav>
  );
};

export default PageNav;
