import React from "react";
import styles from "./Chat.module.scss";

import Icon from "../UI/Icon";

const Chat = () => {
  return (
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
    </div>
  );
};

export default Chat;
