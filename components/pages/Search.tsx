import React, { useState } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import useInfiniteScroll from "@/hooks/useInfiniteScroll.";
import axios from "axios";

import MovieCard from "../Cards/MovieCard";
import MovieCardWide from "../Cards/MovieCardWide";
import IconButton from "../Buttons/IconButton";
import Icon from "../UI/Icon";
import PageLoader from "../UI/PageLoader";

import styles from "./Search.module.scss";

const Search = () => {
  const router = useRouter();

  const [display, setDisplay] = useState(false);

  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["search", { query: router.query.query }],
      getNextPageParam: (prevData: any) => prevData.data.next,
      queryFn: ({ pageParam = 1 }) =>
        axios.get(`/api/movies/title/${router.query.query}`, {
          params: { page: pageParam },
        }),
      refetchOnWindowFocus: false,
    });

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <section className={styles.search_results}>
      <div className={styles.header}>
        <h1>
          {!isLoading &&
          data?.pages.flatMap((data: any) => data.data.movies).length == 0
            ? `No results for „${router.query.query}”`
            : `Search results for „${router.query.query}”`}
        </h1>
        <div
          className={`${styles.display_buttons} ${
            display ? styles.grid : styles.row
          }`}
        >
          <IconButton
            action={() => {
              setDisplay(true);
            }}
          >
            <Icon icon="displayGrid" />
          </IconButton>
          <IconButton
            action={() => {
              setDisplay(false);
            }}
          >
            <Icon icon="displayRow" />
          </IconButton>
        </div>
      </div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <ul className={display ? styles.grid : styles.row}>
          {data!.pages
            .flatMap((data: any) => data.data.movies)
            .map((movie, index: number) =>
              display ? (
                <MovieCard
                  key={index}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  poster={movie.poster}
                  description={movie.description}
                  language={movie.language}
                  runtime={movie.runtime}
                  imdbID={movie.id}
                  video={movie.video}
                />
              ) : (
                <MovieCardWide
                  key={index}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  poster={movie.poster}
                  description={movie.description}
                  language={movie.language}
                  runtime={movie.runtime}
                  imdbID={movie.id}
                  video={movie.video}
                />
              )
            )}
        </ul>
      )}
      <div ref={observerRef}></div>
    </section>
  );
};

export default Search;
