import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { createPortal } from "react-dom";

import { clear } from "@/store/message";

import styles from "./MessageModal.module.scss";

import Icon from "../UI/Icon";

const MESSAGES = [{}];

const MessageModal = () => {
  const user = useAppSelector((state) => state.messageData.toUser);
  const isMessageVisible = useAppSelector((state) => state.messageData.toUser);

  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(clear());
  };

  return (
    isMessageVisible &&
    createPortal(
      <div className={`modal ${styles.message_modal}`}>
        <div className={styles.header}>
          <span
            className={`${styles.name} ${user?.isOnline ? styles.online : ""}`}
          >
            {user?.name}
          </span>
          <button onClick={closeModalHandler} className={styles.close_button}>
            <Icon icon="closeOutline" />
          </button>
        </div>
        <ul className={styles.messages}></ul>
        <form className={styles.text_area}>
          <input type={"text"} placeholder="Type message..." />
          <button type="submit">
            <Icon icon="paperPlane" />
          </button>
        </form>
      </div>,
      document.getElementById("modal")!
    )
  );
};

export default MessageModal;
