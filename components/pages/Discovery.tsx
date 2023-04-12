import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import MovieCard from "../Cards/MovieCard";
import CategoryLabel from "../Labels/CategoryLabel";

import styles from "./Discovery.module.scss";

const Discovery = () => {
  const [movieData, setMovieData] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useQuery({
    queryKey: "genres",
    queryFn: () => axios.get("/api/genres"),
    refetchOnWindowFocus: false,
  });

  const fetchData = async () => {
    const keyword = inputRef.current!.value;

    const res = await axios.get("/api/movies", {
      params: {
        keyword: null,
        genres: null,
        year: null,
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
                <input type="checkbox" id={genre.id} key={genre.id} />
                <label htmlFor={genre.id}>{genre.genre}</label>
              </div>
            ))}
          </div>
          <CategoryLabel>Year</CategoryLabel>
          <div className={styles.options}>
            <input type="text" className={styles.input} placeholder="From" />
            <input type="text" className={styles.input} placeholder="To" />
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
