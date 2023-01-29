import React from "react";
import styles from "./Layout.module.scss";
import Image from "next/image";

import Searchbar from "./Searchbar";
import UserButtons from "./UserButtons";

interface LayoutProps {
  children: JSX.Element;
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
      <aside className={styles.sidebar}>
        <nav className={styles.sidebar__nav}></nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
