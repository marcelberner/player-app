import React from "react";

import styles from "./Button.module.scss";

interface buttonProps {
  children: string | JSX.Element | JSX.Element[];
  outline?: boolean;
}

const Button: React.FC<buttonProps> = ({ children, outline }) => {
  return (
    <button className={`${styles.button} ${outline ? styles.outline : ""}`}>
      {children}
    </button>
  );
};

export default Button;
