import React from "react";

import styles from "./CategoryLabel.module.scss";

interface LabelProps {
  children: string;
}

const CategoryLabel: React.FC<LabelProps> = ({ children }) => {
  return <h2 className={styles.label}>{children}</h2>;
};

export default CategoryLabel;
