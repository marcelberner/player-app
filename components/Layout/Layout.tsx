import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setSidebarState } from "@/store/sidebar";
import useMounted from "@/hooks/useMounted";
import { setUser } from "@/store/user";

import Searchbar from "./Searchbar";
import UserButtons from "./userButtons/UserButtons";
import PageNav from "./nav/PageNav";
import FriendsList from "./friends/FriendsList";
import Icon from "../UI/Icon";
import IconButton from "../Buttons/IconButton";
import MessageModal from "../modals/MessageModal";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const STATIC_PAGES = ["/discovery", "/cinema"];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchbarState, setSearchbarState] = useState<boolean>(false);

  const router = useRouter();
  const currentRoute = router.pathname;

  const mounted = useMounted();

  const sidebarState = useAppSelector((state) => state.sidebarData.isHidden);
  const isMessageVisible = useAppSelector((state) => state.messageData.user);
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: "userData",
    queryFn: () =>
      axios.get("/api/user/data").then((res) => {
        dispatch(
          setUser({
            username: res.data.userData.rows[0].username,
            email: res.data.userData.rows[0].email,
          })
        );
      }),
    refetchOnWindowFocus: false,
  });

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

    if (!state || window.innerWidth <= 1024) {
      document.documentElement.style.setProperty(
        "--sidebar-current",
        "var(--sidebar-hide)"
      );
      dispatch(setSidebarState(false));
    } else dispatch(setSidebarState(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="layout"
      className={`${styles.page_layout}  ${
        STATIC_PAGES.includes(currentRoute) ? styles.static : ""
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
          <Image
            priority
            src="/logo-compact.svg"
            className={`${styles.logo} ${styles.mobile}`}
            height={40}
            width={52}
            alt="PlayerApp logo"
          />
        </Link>
        <nav className={styles.header__nav}>
          <Searchbar
            searchbarState={searchbarState}
            toggleSearchbar={() => setSearchbarState((prev) => !prev)}
          />
          <UserButtons searchbarState={searchbarState} />
        </nav>
      </header>
      {mounted && (
        <div
          className={`${styles.sidebar} ${!sidebarState ? styles.active : ""}`}
        >
          <PageNav state={sidebarState} />
          <FriendsList state={sidebarState} />
          <IconButton action={sidebarHideHandler}>
            <Icon icon="hideArrow" />
          </IconButton>
        </div>
      )}
      <main
        className={`${styles.main} ${
          STATIC_PAGES.includes(currentRoute) ? styles.static : ""
        }`}
      >
        {children}
      </main>
      {isMessageVisible && <MessageModal />}
    </div>
  );
};

export default Layout;
