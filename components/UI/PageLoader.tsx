import React from "react";

import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
    </div>
  );
};

export default PageLoader;
