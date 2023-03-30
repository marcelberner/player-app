import React from "react";
import { signOut } from "next-auth/react";
import { useAppSelector } from "@/hooks/redux";

import Button from "../Buttons/Button";
import Icon from "../UI/Icon";

import styles from "./LogoutModal.module.scss";

interface modalProps {
  modalRef: any;
}

const LogoutModal: React.FC<modalProps> = ({ modalRef }) => {
  const userData = useAppSelector((state) => state.userData);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <div className={styles.header}>
        <Icon icon="userAvatar" />
        <span className={styles.username}>
          {userData.username}
        </span>
        <span className={styles.email}>
          {userData.email}
        </span>
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
