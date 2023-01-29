import React from "react";
import { TbMessage2, TbGift } from "react-icons/tb";
import { BiBell } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

import styles from "./UserButtons.module.scss";

const UserButtons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.button}>
        <TbGift />
      </button>
      <button className={styles.button}>
        <TbMessage2 />
      </button>
      <button className={styles.button}>
        <div className={styles.allert_mark}/>
        <BiBell />
      </button>
      <div className={styles.user_button}>
        <button className={styles.button}>
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
};

export default UserButtons;
