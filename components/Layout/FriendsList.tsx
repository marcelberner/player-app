import React from "react";
import { FaUserCircle } from "react-icons/fa";

import styles from "./FriendsList.module.scss";

const FriendsList = () => {
  return (
    <div className={styles.friendslist}>
      <h3 className={styles.label}>Znajomi</h3>
      <ul className={styles.list}>
        <li className={`${styles.friend}`}>
          <FaUserCircle />
          <span className={styles.name}>Mariusz4235</span>
        </li>
        <li className={`${styles.friend} ${styles.online}`}>
          <FaUserCircle />
          <span className={styles.name}>Janusz21</span>
        </li>
        <li className={`${styles.friend} ${styles.online}`}>
          <FaUserCircle />
          <span className={styles.name}>Mariola41</span>
        </li>
        <li className={`${styles.friend}`}>
          <FaUserCircle />
          <span className={styles.name}>Jaro68</span>
        </li>
        <li className={`${styles.friend} ${styles.online}`}>
          <FaUserCircle />
          <span className={styles.name}>Bożydar000</span>
        </li>
        <li className={`${styles.friend}`}>
          <FaUserCircle />
          <span className={styles.name}>Kamil39</span>
        </li>
      </ul>
    </div>
  );
};

export default FriendsList;
