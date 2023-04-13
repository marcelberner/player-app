import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import qs from "qs";

import MovieCard from "../Cards/MovieCard";
import CategoryLabel from "../Labels/CategoryLabel";

import styles from "./Discovery.module.scss";

const Discovery = () => {
  const [movieData, setMovieData] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const yearStartRef = useRef<HTMLInputElement>(null);
  const yearEndRef = useRef<HTMLInputElement>(null);

  const { data } = useQuery({
    queryKey: "genres",
    queryFn: () => axios.get("/api/genres"),
    refetchOnWindowFocus: false,
  });

  const fetchData = async () => {
    const keyword = inputRef.current!.value;
    const yearStart = yearStartRef.current!.value;
    const yearEnd = yearEndRef.current!.value;

    const options = Array.prototype.slice.call(
      document.querySelectorAll(`.genre_option:checked`)
    );

    const genres: string[] = options.map(
      (option: any) => `'${option.dataset.genre}'`
    );

    const res = await axios.get("/api/movies", {
      params: {
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

    setMovieData(res.data.movies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles.discovery}>
      <div className={styles.filters}>
        <form onChange={fetchData}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Keyword..."
          />
          <CategoryLabel>Genres</CategoryLabel>
          <div className={styles.options}>
            {data?.data.genres.map((genre: any) => (
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
      <ul className={styles.list}>
        {movieData &&
          movieData.map((movie: any) => (
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
          ))}
      </ul>
    </section>
  );
};

export default Discovery;
