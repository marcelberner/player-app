import React from "react";

import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/store/message";

import styles from "./UserModal.module.scss";

import Button from "../Buttons/Button";
import Icon from "../UI/Icon";

interface modalProps {
  id: string;
  name: string;
  isOnline: boolean;
  modalRef: any;
  position: {
    x: number;
    y: number;
  };
  closeModal: (event?: any) => void;
}

const UserModal: React.FC<modalProps> = ({
  id,
  name,
  position,
  isOnline,
  modalRef,
  closeModal,
}) => {
  const dispatch = useAppDispatch();

  const showMessageHandler = () => {
    dispatch(setUser({ id, name, isOnline }));
    closeModal();
  };

  return (
    <div
      ref={modalRef}
      className={`modal ${styles.modal}`}
      style={{ top: position.y, left: position.x + 30 }}
    >
      <div className={styles.header}>
        <div className={`${styles.data} ${!isOnline ? styles.online : ""}`}>
          <Icon icon="userAvatar" />
          <span>{name}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button action={showMessageHandler}>Send message</Button>
        <Button outline>Remove</Button>
      </div>
    </div>
  );
};

export default UserModal;
