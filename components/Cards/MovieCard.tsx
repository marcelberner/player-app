import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import useMounted from "@/hooks/useMounted";
import useModal from "@/hooks/useModal";

import styles from "./MovieCard.module.scss";

import MovieModal from "../modals/MovieModal";
import PosterPlaceholder from "../UI/placeholders/PosterPlaceholder";
import Icon from "../UI/Icon";

interface movieProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
  language?: string;
  description?: string;
  runtime?: number;
  video: string;
  imdbID: string;
  genres?: string[];
}

const MovieCard: React.FC<movieProps> = ({
  title,
  year,
  rating,
  poster,
  description,
  language,
  runtime,
  imdbID,
  video,
  genres,
}) => {
  const mounted = useMounted();
  const { modalRef, modalState, showModal, closeModal } = useModal();
  return (
    <>
      <div onClick={showModal} className={styles.card}>
        <div className={styles.rate}>
          <Icon icon="starOutline" />
          <span>{(rating / 10).toFixed(1).toString().replace(".", ",")}</span>
        </div>
        <div className={styles.description}>
          <span className={styles.title}>{title}</span>
          <span className={styles.year}>{year}</span>
        </div>
        {poster != "undefined" ? (
          <Image src={poster} width={200} height={285} alt={title} />
        ) : (
          <PosterPlaceholder />
        )}
      </div>
      {mounted &&
        modalState &&
        createPortal(
          <MovieModal
            title={title}
            year={year}
            rating={rating}
            poster={poster}
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
