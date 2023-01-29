import React from "react";
import styles from "./Searchbar.module.scss";

import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  return (
    <div className={styles.container}>
      <input
        type={"search"}
        className={styles.searchbar}
        placeholder="Wyszukaj ulubiony tytuł"
      />
      <button className={styles.button}>
        <FiSearch />
      </button>
    </div>
  );
};

export default Searchbar;
