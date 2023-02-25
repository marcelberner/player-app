import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { createPortal } from "react-dom";

import useMounted from "@/hooks/useMounted";
import useModal from "@/hooks/useModal";

import styles from "./MovieCard.module.scss";

import MovieModal from "../modals/MovieModal";

interface movieProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
  genres?: number[];
  language?: string;
  description?: string;
  runtime?: number;
}

const MovieCard: React.FC<movieProps> = ({
  title,
  year,
  rating,
  poster,
  genres,
  description,
  language,
  runtime,
}) => {
  const mounted = useMounted();
  const { modalRef, modalState, showModal, closeModal } = useModal();
  return (
    <>
      <div onClick={showModal} className={styles.card}>
        <div className={styles.rate}>
          <AiOutlineStar />
          <span>{(rating / 10).toFixed(1).toString().replace(".", ",")}</span>
        </div>
        <div className={styles.description}>
          <span className={styles.title}>{title}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <img src={poster} alt={title} />
      </div>
      {mounted &&
        modalState &&
        createPortal(
          <MovieModal
            title={title}
            year={year}
            rating={rating}
            poster={poster}
            genres={genres}
            description={description}
            language={language}
            runtime={runtime}
            modalRef={modalRef}
            closeModal={closeModal}
          />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default MovieCard;
