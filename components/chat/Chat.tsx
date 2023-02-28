import React from "react";
import { createPortal } from "react-dom";

import useMounted from "@/hooks/useMounted";

import styles from "./Chat.module.scss";

import Icon from "../UI/Icon";

const Chat = () => {
  const mounted = useMounted();

  return (
    mounted &&
    createPortal(
      <div className={styles.chat}>
        <ul className={styles.messages}>
          <li className={styles.message}>
            <span className={styles.nick}>Nickname12345</span>
            <span className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              voluptas
            </span>
          </li>
          <li className={styles.message}>
            <span className={styles.nick}>Nickname12345</span>
            <span className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              voluptas
            </span>
          </li>
          <li className={styles.message}>
            <span className={styles.nick}>Nickname12345</span>
            <span className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              voluptas
            </span>
          </li>
          <li className={styles.message}>
            <span className={styles.nick}>Nickname12345</span>
            <span className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              voluptas
            </span>
          </li>
        </ul>
        <form className={styles.text_area}>
          <input type="text" placeholder="Send message..." />
          <button type="submit">
            <Icon icon="paperPlane" />
          </button>
        </form>
      </div>,
      document.getElementById("layout")!
    )
  );
};

export default Chat;
