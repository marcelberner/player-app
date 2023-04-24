import React, { useRef, useState } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import useInfiniteScroll from "@/hooks/useInfiniteScroll.";
import qs from "qs";

import MovieCard from "../Cards/MovieCard";
import CategoryLabel from "../Labels/CategoryLabel";
import PageLoader from "../UI/PageLoader";
import IconButton from "../Buttons/IconButton";
import Icon from "../UI/Icon";

import styles from "./Discovery.module.scss";

const Discovery = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const yearStartRef = useRef<HTMLInputElement>(null);
  const yearEndRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingGenres } = useQuery({
    queryKey: "genres",
    queryFn: () => axios.get("/api/genres"),
    refetchOnWindowFocus: false,
  });

  const getGenres = () => {
    const options = Array.prototype.slice.call(
      document.querySelectorAll(`.genre_option:checked`)
    );

    const genres: string[] = options.map(
      (option: any) => `'${option.dataset.genre}'`
    );

    return genres;
  };

  const {
    data: movieData,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["discovery"],
    getNextPageParam: (prevData: any) => prevData.data.next,
    queryFn: ({ pageParam = 1 }) => {
      const keyword = inputRef.current!.value;
      const yearStart = yearStartRef.current!.value;
      const yearEnd = yearEndRef.current!.value;
      const genres = getGenres();

      return axios.get(`/api/movies`, {
        params: {
          page: pageParam,
          keyword: keyword,
          genres: genres,
          yearStart: yearStart,
          yearEnd: yearEnd,
        },
        paramsSerializer: {
          serialize: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        },
      });
    },
    refetchOnWindowFocus: false,
  });

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const filterExpandHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExpanded((prev) => !prev);
  };

  if (isLoadingGenres) return <PageLoader />;

  return (
    <section className={styles.discovery}>
      <div className={`${styles.filters} ${isExpanded ? styles.expand : ""}`}>
        <form
          className={isExpanded ? styles.expand : ""}
          onChange={() => queryClient.invalidateQueries("discovery")}
        >
          <div
            className={`${styles.control_wrapper} ${
              isExpanded ? styles.expand : ""
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Keyword..."
            />
            <IconButton action={filterExpandHandler}>
              <Icon icon={isExpanded ? "closeOutline" : "filterOutline"} />
            </IconButton>
          </div>
          <CategoryLabel>Genres</CategoryLabel>
          <div className={styles.options}>
            {data!.data.genres.map((genre: any) => (
              <div key={genre.id}>
                <input
                  type="checkbox"
                  className={"genre_option"}
                  id={genre.id}
                  data-genre={genre.genre}
                  key={genre.id}
                />
                <label htmlFor={genre.id}>{genre.genre}</label>
              </div>
            ))}
          </div>
          <CategoryLabel>Year</CategoryLabel>
          <div className={styles.options}>
            <input
              ref={yearStartRef}
              type="text"
              className={styles.input}
              placeholder="From"
            />
            <input
              ref={yearEndRef}
              type="text"
              className={styles.input}
              placeholder="To"
            />
          </div>
        </form>
      </div>
      <ul
        ref={listRef}
        className={`${styles.list} ${isLoading ? styles.loading : ""}`}
      >
        {isLoading ? (
          <PageLoader />
        ) : (
          movieData!.pages
            .flatMap((data: any) => data.data.movies)
            .map((movie: any) => (
              <li key={movie.movie_id}>
                <MovieCard
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  poster={movie.poster}
                  description={movie.description}
                  language={movie.language}
                  runtime={movie.runtime}
                  imdbID={movie.movie_id}
                  video={movie.video}
                />
              </li>
            ))
        )}
        <li ref={observerRef}></li>
      </ul>
    </section>
  );
};

export default Discovery;
