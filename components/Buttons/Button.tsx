import React from "react";

import styles from "./Button.module.scss";

interface buttonProps {
  children: string | JSX.Element | JSX.Element[];
  outline?: boolean;
  action?: () => void;
}

const Button: React.FC<buttonProps> = ({ children, outline, action }) => {
  return (
    <button onClick={action} className={`${styles.button} ${outline ? styles.outline : ""}`}>
      {children}
    </button>
  );
};

export default Button;
