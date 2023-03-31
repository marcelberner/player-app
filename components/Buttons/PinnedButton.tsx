import React from "react";

import styles from "./PinnedButton.module.scss";

interface buttonProps {
  children: JSX.Element;
  action: () => void;
}

const PinnedButton: React.FC<buttonProps> = ({ children, action }) => {
  return (
    <button onClick={action} className={styles.pinned_button}>
      {children}
    </button>
  );
};

export default PinnedButton;
