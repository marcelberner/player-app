import React from "react";

import styles from "./PageNav.module.scss";

import NavItem from "./NavItem";
import Icon from "@/components/UI/Icon";

interface navProps {
  state: boolean;
}

const NAV_ITEMS = [
  {
    link: "/",
    icon: <Icon icon="homeOutline" />,
    text: "Home",
  },
  {
    link: "/discovery",
    icon: <Icon icon="compassOutline" />,
    text: "Discovery",
  },
  {
    link: "/community",
    icon: <Icon icon="communityOutline" />,
    text: "Community",
  },
  {
    link: "/cinema",
    icon: <Icon icon="liveOutline" />,
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
