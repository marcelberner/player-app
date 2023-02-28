import React from "react";

import Button from "../Buttons/Button";
import Icon from "../UI/Icon";

import styles from "./LogoutModal.module.scss";

interface modalProps {
  modalRef: any;
}

const LogoutModal: React.FC<modalProps> = ({ modalRef }) => {
  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <div className={styles.header}>
        <Icon icon="userAvatar" />
        <span className={styles.username}>Marcel Berner</span>
        <span className={styles.email}>marcel.berner@op.pl</span>
      </div>
      <div className={styles.buttons}>
        <Button outline>Logout</Button>
      </div>
    </div>
  );
};

export default LogoutModal;
