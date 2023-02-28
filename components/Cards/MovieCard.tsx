import React from "react";
import { createPortal } from "react-dom";

import useMounted from "@/hooks/useMounted";
import useModal from "@/hooks/useModal";

import styles from "./MovieCard.module.scss";

import MovieModal from "../modals/MovieModal";
import Icon from "../UI/Icon";

interface movieProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
  genres?: number[];
  language?: string;
  description?: string;
  runtime?: number;
  video: string;
  imdbID: string;
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
  imdbID,
  video
}) => {
  const mounted = useMounted();
  const { modalRef, modalState, showModal, closeModal } = useModal();
  return (
    <>
      <div onClick={showModal} className={styles.card}>
        <div className={styles.rate}>
          <Icon icon="starOutline"/>
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
            video={video}
            imdbID={imdbID}
            modalRef={modalRef}
            closeModal={closeModal}
          />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default MovieCard;
