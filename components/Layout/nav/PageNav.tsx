import React from "react"

import styles from "./PageNav.module.scss"

import NavItem from "./NavItem"
import Icon from "@/components/UI/Icon"

interface navProps {
  state: boolean
}

const NAV_ITEMS = [
  {
    link: "/",
    icon: <Icon icon="homeOutline" />,
    iconActive: <Icon icon="homeFill" />,
    text: "Home",
  },
  {
    link: "/discovery",
    icon: <Icon icon="compassOutline" />,
    iconActive: <Icon icon="compassFill" />,
    text: "Discovery",
  },
  {
    link: "/community",
    icon: <Icon icon="communityOutline" />,
    iconActive: <Icon icon="communityFill" />,
    text: "Community",
  },
  {
    link: "/cinema",
    icon: <Icon icon="liveOutline" />,
    iconActive: <Icon icon="liveFill" />,
    text: "Live cinema",
  },
]

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
            iconActive={item.iconActive}
            state={state}
          />
        ))}
      </ul>
    </nav>
  )
}

export default PageNav
