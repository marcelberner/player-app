import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";

import MovieCard from "../Cards/MovieCard";
import MovieCardWide from "../Cards/MovieCardWide";
import IconButton from "../Buttons/IconButton";
import Icon from "../UI/Icon";

import styles from "./Search.module.scss";

const Search = () => {
  const router = useRouter();

  const [display, setDisplay] = useState(false);

  const { data } = useQuery({
    queryKey: ["search", { query: router.query.query }],
    queryFn: () => axios.get(`/api/movies/title/${router.query.query}`),
    refetchOnWindowFocus: false,
  });

  return (
    <section className={styles.search_results}>
      <div className={styles.header}>
        <h1>
          {data && (data as any).data.movies.rows.length == 0
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
      <ul className={display ? styles.grid : styles.row}>
        {data &&
          (data as any).data.movies.rows.map((movie: any, index: number) =>
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
                video={
                  "https://www.youtube.com/d3a8eb5d-d645-49f5-986d-07b180fe533e"
                }
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
                video={
                  "https://www.youtube.com/d3a8eb5d-d645-49f5-986d-07b180fe533e"
                }
              />
            )
          )}
      </ul>
    </section>
  );
};

export default Search;
