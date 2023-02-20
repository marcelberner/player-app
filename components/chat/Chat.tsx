import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxPaperPlane } from "react-icons/rx";

import styles from "./Chat.module.scss";

const Chat = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <div className={styles.chat}>
          <ul className={styles.messages}>
            <li className={styles.message}>
              <span className={styles.nick}>Nickname12345</span>
              <span className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae voluptas
              </span>
            </li>
            <li className={styles.message}>
              <span className={styles.nick}>Nickname12345</span>
              <span className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae voluptas
              </span>
            </li>
            <li className={styles.message}>
              <span className={styles.nick}>Nickname12345</span>
              <span className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae voluptas
              </span>
            </li>
            <li className={styles.message}>
              <span className={styles.nick}>Nickname12345</span>
              <span className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae voluptas
              </span>
            </li>
          </ul>
          <form className={styles.text_area}>
            <input type="text" placeholder="Send message..." />
            <button type="submit">
              <RxPaperPlane />
            </button>
          </form>
        </div>,
        document.getElementById("layout")!
      )
    : null;
};

export default Chat;
