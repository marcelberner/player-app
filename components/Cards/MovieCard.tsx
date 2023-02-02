import React from "react";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";

import styles from "./MovieCard.module.scss";

const MovieCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.rate}>
        <AiOutlineStar />
        <span>7,4</span>
      </div>
      <div className={styles.description}>
        <span className={styles.title}>Avatar: Istota wody</span>
        <span className={styles.year}>2022</span>
      </div>
      <Image src="/card.jpg" alt="" width={200} height={285} />
    </div>
  );
};

export default MovieCard;
