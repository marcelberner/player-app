import React from "react";
import styles from "./Layout.module.scss";
import Image from "next/image";
import { BiArrowFromLeft } from "react-icons/bi";

import Searchbar from "./Searchbar";
import UserButtons from "./UserButtons";
import PageNav from "./PageNav";
import FriendsList from "./FriendsList";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.page_layout}>
      <header className={styles.header}>
        <Image
          priority
          src="/logo.svg"
          className="logo"
          height={40}
          width={200}
          alt="PlayerApp logo"
        />
        <nav className={styles.header__nav}>
          <Searchbar />
          <UserButtons />
        </nav>
      </header>
      <div className={styles.sidebar}>
        <PageNav />
        <FriendsList />
        <button className={styles.sidebar_button}>
          <BiArrowFromLeft />
        </button>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
