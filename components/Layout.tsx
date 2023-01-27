import React from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.page_layout}>
      <header className={styles.header}>
        <nav className={styles.header__nav}></nav>
      </header>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebar__nav}></nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
