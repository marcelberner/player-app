import React, { useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiArrowFromLeft } from "react-icons/bi";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setSidebarState } from "@/store/sidebar";

import Searchbar from "./Searchbar";
import UserButtons from "./userButtons/UserButtons";
import PageNav from "./nav/PageNav";
import FriendsList from "./friends/FriendsList";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  // const [sidebarState, setSidebarState] = useState<boolean>(true);
  const sidebarState = useAppSelector((state) => state.sidebarData.isHidden);
  const dispatch = useAppDispatch();

  const sidebarHideHandler = () => {
    if (sidebarState) {
      dispatch(setSidebarState(false));
      document.documentElement.style.setProperty(
        "--sidebar-current",
        "var(--sidebar-hide)"
      );
      localStorage.setItem("sidebar-state", "false");
    } else {
      dispatch(setSidebarState(true));
      document.documentElement.style.setProperty(
        "--sidebar-current",
        "var(--sidebar-show)"
      );
      localStorage.setItem("sidebar-state", "true");
    }
  };

  useEffect(() => {
    const state = localStorage.getItem("sidebar-state") === "true";
    dispatch(setSidebarState(state));
    if (!state)
      document.documentElement.style.setProperty(
        "--sidebar-current",
        "var(--sidebar-hide)"
      );
  }, []);

  return (
    <div
      id="layout"
      className={`${styles.page_layout} ${
        currentRoute === "/cinema" ? styles.active : ""
      }`}
    >
      <header className={styles.header}>
        <Link href={"/"}>
          <Image
            priority
            src="/logo.svg"
            className={styles.logo}
            height={40}
            width={200}
            alt="PlayerApp logo"
          />
        </Link>
        <nav className={styles.header__nav}>
          <Searchbar />
          <UserButtons />
        </nav>
      </header>
      <div
        className={`${styles.sidebar} ${!sidebarState ? styles.active : ""}`}
      >
        <PageNav state={sidebarState} />
        <FriendsList state={sidebarState} />
        <button className={styles.sidebar_button} onClick={sidebarHideHandler}>
          <BiArrowFromLeft />
        </button>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
