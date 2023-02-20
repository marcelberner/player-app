import React from "react";
import { FaUserCircle } from "react-icons/fa";

import styles from "./UserModal.module.scss";

import Button from "../Buttons/Button";

interface modalProps {
  id: string;
  name: string;
  isOnline: boolean;
  position: {
    x: number;
    y: number;
  };
}

const UserModal: React.FC<modalProps> = ({ id, name, position, isOnline }) => {
  return (
    <div
      className={styles.modal}
      style={{ top: position.y, left: position.x + 30 }}
    >
      <div className={styles.header}>
        <div className={`${styles.data} ${!isOnline ? styles.online : ""}`}>
          <FaUserCircle />
          <span>{name}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button>Send message</Button>
        <Button outline>Remove</Button>
      </div>
    </div>
  );
};

export default UserModal;
