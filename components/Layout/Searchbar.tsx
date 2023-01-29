import React from "react";
import styles from "./Searchbar.module.scss";

import { BsSearch } from "react-icons/bs";

const Searchbar = () => {
  return (
    <div className={styles.container}>
      <input
        type={"search"}
        className={styles.searchbar}
        placeholder="Wyszukaj ulubiony tytuł"
      />
      <button className={styles.button}>
        <BsSearch />
      </button>
    </div>
  );
};

export default Searchbar;
