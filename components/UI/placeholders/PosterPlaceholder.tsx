import React from "react";

import Icon from "../Icon";

import styles from "./PosterPlaceholder.module.scss";

const PosterPlaceholder = () => {
  return (
    <div className={styles.poster_placeholder}>
      <Icon icon="picturePlaceholder" />
    </div>
  );
};

export default PosterPlaceholder;
