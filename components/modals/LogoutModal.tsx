import React from "react";
import { FaUserCircle } from "react-icons/fa";

import Button from "../Buttons/Button";

import styles from "./LogoutModal.module.scss";

interface modalProps {
  modalRef: any;
}

const LogoutModal: React.FC<modalProps> = ({ modalRef }) => {
  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <div className={styles.header}>
        <FaUserCircle />
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
