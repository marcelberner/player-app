import React from "react";
import styles from "./MovieModal.module.scss";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/dist/client/image";

import Player from "../Players/Player";
import CategoryLabel from "../Labels/CategoryLabel";
import Button from "../Buttons/Button";
import Icon from "../UI/Icon";
import PosterPlaceholder from "../UI/placeholders/PosterPlaceholder";

interface modalProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
  language?: string;
  description?: string;
  runtime?: number;
  modalRef: any;
  video: string;
  imdbID: string;
  closeModal?: () => void;
}

const MovieModal: React.FC<modalProps> = ({
  title,
  year,
  poster,
  rating,
  description,
  language,
  runtime,
  modalRef,
  video,
  imdbID,
  closeModal,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movie-details", { movieID: imdbID }],
    queryFn: () => axios.get(`/api/movies/${imdbID}/genres`),
    refetchOnWindowFocus: false,
  });

  return (
    <div ref={modalRef} className={`modal ${styles.movie_modal}`}>
      <div className={styles.closebar}>
        <div onClick={closeModal}>
          <Icon icon="closeOutline" />
        </div>
      </div>
      <Player video={video} />
      <div className={styles.header}>
        <a
          href={`https://www.imdb.com/title/${imdbID}`}
          target={"_blank"}
          rel="noreferrer"
        >
          <h1 className={styles.title}>{title}</h1>
        </a>
        <div className={styles.movie_data}>
          <span className={styles.rating}>
            <Icon icon="starOutline" />{" "}
            {(rating / 10).toFixed(1).toString().replace(".", ",")}
          </span>
          <span>
            <Icon icon="calendarOutline" /> {year}
          </span>
          <span className={styles.upper}>
            <Icon icon="globeOutline" /> {language}
          </span>
          <span>
            <Icon icon="clockOutline" /> {runtime} min
          </span>
        </div>
      </div>
      <div className={styles.description}>
        <CategoryLabel>Description</CategoryLabel>
        {poster != "undefined" ? (
          <Image
            src={poster}
            width={200}
            height={285}
            alt={`${title} movie poster`}
          />
        ) : (
          <PosterPlaceholder />
        )}
        <p>{description}</p>
      </div>
      <div className={styles.categories}>
        <CategoryLabel>Categories</CategoryLabel>
        <ul className={styles.category_list}>
          {data?.data.genres.rows.map((genre: any) => (
            <li key={genre.id}>{genre.genre}</li>
          ))}
        </ul>
      </div>
      <div className={styles.opinions}>
        <CategoryLabel>Opinions</CategoryLabel>
        <form className={styles.form}>
          <Icon icon="userAvatar" />
          <textarea placeholder="Share your opinion about movie..." />
          <Button>Share</Button>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
