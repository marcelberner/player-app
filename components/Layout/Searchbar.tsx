import React from "react";
import styles from "./Searchbar.module.scss";

import Icon from "../UI/Icon";

const Searchbar = () => {
  return (
    <div className={styles.container}>
      <input
        type={"search"}
        className={styles.searchbar}
        placeholder="Search title..."
      />
      <button className={styles.button}>
        <Icon icon="searchLoupe" />
      </button>
    </div>
  );
};

export default Searchbar;
