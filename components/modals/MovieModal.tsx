import React from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineStar,
  AiOutlineClose,
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import styles from "./MovieModal.module.scss";

import Player from "../Players/Player";
import CategoryLabel from "../Labels/CategoryLabel";
import Button from "../Buttons/Button";

interface modalProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
  genres?: number[];
  language?: string;
  description?: string;
  runtime?: number;
  modalRef: any;
  closeModal?: () => void;
}

const MovieModal: React.FC<modalProps> = ({
  title,
  year,
  poster,
  rating,
  description,
  genres,
  language,
  runtime,
  modalRef,
  closeModal,
}) => {
  return (
    <div ref={modalRef} className={`modal ${styles.movie_modal}`}>
      <div className={styles.closebar}>
        <AiOutlineClose onClick={closeModal} />
      </div>
      <Player />
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.movie_data}>
          <span className={styles.rating}>
            <AiOutlineStar />{" "}
            {(rating / 10).toFixed(1).toString().replace(".", ",")}
          </span>
          <span>
            <AiOutlineCalendar /> {year}
          </span>
          <span>
            <HiOutlineGlobeAlt /> {language}
          </span>
          <span>
            <AiOutlineClockCircle /> {runtime} min
          </span>
        </div>
      </div>
      <div className={styles.description}>
        <CategoryLabel>Description</CategoryLabel>
        <img src={poster} alt={`${title} movie poster`} />
        <p>{description}</p>
      </div>
      <div className={styles.categories}>
        <CategoryLabel>Categories</CategoryLabel>
        <ul className={styles.category_list}>
          <li>Horror</li>
          <li>Comedy</li>
          <li>Drama</li>
        </ul>
      </div>
      <div className={styles.opinions}>
        <CategoryLabel>Opinions</CategoryLabel>
        <form className={styles.form}>
          <FaUserCircle />
          <textarea placeholder="Share your opinion about movie..." />
          <Button>Share</Button>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
