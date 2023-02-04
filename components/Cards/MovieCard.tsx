import React from "react";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";

import styles from "./MovieCard.module.scss";

interface movieProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
}

const MovieCard: React.FC<movieProps> = ({ title, year, rating, poster }) => {
  return (
    <div className={styles.card}>
      <div className={styles.rate}>
        <AiOutlineStar />
        <span>{(rating / 10).toFixed(1).toString().replace(".",",")}</span>
      </div>
      <div className={styles.description}>
        <span className={styles.title}>{title}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <img src={poster} alt={title} />
    </div>
  );
};

export default MovieCard;
