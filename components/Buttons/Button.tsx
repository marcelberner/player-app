import React from "react";

import styles from "./Button.module.scss";

interface buttonProps {
  children: string | JSX.Element|JSX.Element[];
}

const Button: React.FC<buttonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
