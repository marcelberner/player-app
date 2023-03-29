import React from "react";

import styles from "./IconButton.module.scss";

interface buttonProps {
  children: JSX.Element;
  action: () => void;
  id?: string;
}

const IconButton: React.FC<buttonProps> = ({ children, action, id }) => {
  return (
    <button id={id} className={styles.button} onClick={action}>
      {children}
    </button>
  );
};

export default IconButton;
