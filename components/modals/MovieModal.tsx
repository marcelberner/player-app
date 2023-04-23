import React, { useState, useRef } from "react";
import styles from "./MovieModal.module.scss";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import axios from "axios";
import Image from "next/dist/client/image";

import useInfiniteScroll from "@/hooks/useInfiniteScroll.";
import useValidate from "@/hooks/useValidate";

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
  const [userRate, setUserRate] = useState(0);
  const [focusUserRate, setfocusUserRate] = useState(0);

  const opinionRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const [isValid, validate] = useValidate({
    inputRef: opinionRef,
    isEmpty: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["movie-genres", { movieID: imdbID }],
    queryFn: () => axios.get(`/api/movies/${imdbID}/genres`),
    refetchOnWindowFocus: false,
  });

  const {
    data: commentsData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["opinions", { movieID: imdbID }],
    getNextPageParam: (prevData: any) => prevData.data.next,
    queryFn: ({ pageParam = 1 }) =>
      axios.get("api/opinions", {
        params: {
          page: pageParam,
          movieId: imdbID,
        },
      }),
    refetchOnWindowFocus: false,
  });

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const sendOpinion = (data: any) =>
    axios.post("/api/opinions/add", {
      ...data,
    });

  const deleteOpinion = () =>
    axios.delete(`/api/opinions/delete`, {
      params: {
        movieId: imdbID,
      },
    });

  const addOpinionMutation = useMutation({
    mutationFn: sendOpinion,
    onSuccess: () => {
      queryClient.invalidateQueries(["opinions", { movieID: imdbID }]);
      opinionRef.current!.value = "";
    },
  });

  const deleteOpinionMutation = useMutation({
    mutationFn: deleteOpinion,
    onSuccess: () => {
      queryClient.invalidateQueries(["opinions", { movieID: imdbID }]);
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const isInputValid = validate();

    if (userRate < 1 || userRate > 10 || !isInputValid) return;

    addOpinionMutation.mutate({
      movieId: imdbID,
      rating: userRate,
      content: opinionRef.current!.value,
    });
  };

  const deleteHandler = () => deleteOpinionMutation.mutate();

  return (
    <div ref={modalRef} className={`modal ${styles.movie_modal}`}>
      <div className={styles.closebar}>
        <div onClick={closeModal}>
          <Icon icon="closeOutline" />
        </div>
      </div>
      <div className={styles.player}>
        <Player youtubeID={video} />
      </div>
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
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.user_bar}>
            <Icon icon="userAvatar" />
            {userRate > 0 && <span>{userRate} / 10</span>}
          </div>
          <div className={styles.user_rating}>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  onMouseEnter={() => setfocusUserRate(index + 1)}
                  onMouseLeave={() => setfocusUserRate(0)}
                  onClick={() => setUserRate(index + 1)}
                >
                  <Icon
                    icon={
                      focusUserRate > 0
                        ? focusUserRate < index + 1
                          ? "starOutline"
                          : "starFill"
                        : userRate < index + 1
                        ? "starOutline"
                        : "starFill"
                    }
                  />
                </span>
              ))}
          </div>
          <textarea
            ref={opinionRef}
            placeholder="Share your opinion about movie..."
          />
          <Button>Share</Button>
        </form>
        <ul className={styles.opinions_list}>
          {commentsData?.pages
            .flatMap((data: any) => data.data.opinions)
            .map((opinion: any, index) => (
              <li key={index}>
                <span className={styles.opinion_date}>
                  {opinion.create_date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join(".")}
                </span>
                <div>
                  <span className={styles.opinion_creator}>
                    {opinion.username}
                  </span>
                  <span className={styles.opinion_rating}>
                    <Icon icon="starOutline" />
                    <span>{opinion.rating}</span>
                  </span>
                </div>
                <p className={styles.opinion_content}>{opinion.description}</p>
                {opinion.is_me && (
                  <Button action={deleteHandler} outline>
                    <Icon icon="trashFill" />
                  </Button>
                )}
              </li>
            ))}
          <li ref={observerRef}></li>
        </ul>
      </div>
    </div>
  );
};

export default MovieModal;
