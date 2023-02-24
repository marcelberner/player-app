import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { AiOutlineClose } from "react-icons/ai";
import { RxPaperPlane } from "react-icons/rx";

import { clear } from "@/store/message";

import styles from "./MessageModal.module.scss";

const MESSAGES = [
  {

  }
]

const MessageModal = () => {
  const user = useAppSelector((state) => state.messageData.toUser);
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(clear());
  };

  return (
    <div className={`modal ${styles.message_modal}`}>
      <div className={styles.header}>
        <span
          className={`${styles.name} ${user?.isOnline ? styles.online : ""}`}
        >
          {user?.name}
        </span>
        <button onClick={closeModalHandler} className={styles.close_button}>
          <AiOutlineClose />
        </button>
      </div>
      <ul className={styles.messages}></ul>
      <form className={styles.text_area}>
        <input type={"text"} placeholder="Type message..." />
        <button type="submit">
          <RxPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MessageModal;
