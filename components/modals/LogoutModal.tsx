import React from "react";
import { signOut } from "next-auth/react";

import Button from "../Buttons/Button";
import Icon from "../UI/Icon";

import styles from "./LogoutModal.module.scss";

interface modalProps {
  modalRef: any;
}

const LogoutModal: React.FC<modalProps> = ({ modalRef }) => {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <div className={styles.header}>
        <Icon icon="userAvatar" />
        <span className={styles.username}>Marcel Berner</span>
        <span className={styles.email}>marcel.berner@op.pl</span>
      </div>
      <div className={styles.buttons}>
        <Button outline action={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
