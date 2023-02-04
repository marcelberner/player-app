import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";

import styles from "./MovieSection.module.scss";

import CategoryLabel from "../Labels/CategoryLabel";
import MovieCard from "../Cards/MovieCard";

interface SectionProps {
  genre: string;
}

const MovieSection: React.FC<SectionProps> = ({ genre }) => {
  const [movies, setMovies] = useState<any[]>();

  useEffect(() => {
    const getMovies = async () => {
      let genreId;
      try {
        const response = await axios.get(`/api/genres/${genre}`);
        genreId = response.data.id;
        console.log(response.data.id);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(`/api/movies/genres/${genreId}`);
        setMovies(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  return (
    <section className={styles.section}>
      <CategoryLabel>{genre}</CategoryLabel>
      <Swiper
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className={styles.list}
        slidesPerView={"auto"}
      >
        {movies &&
          movies.length > 0 &&
          movies!.map((movie) => (
            <SwiperSlide key={movie.imdbID}>
              <MovieCard
                title={movie.title}
                year={movie.year}
                rating={movie.imdbRating}
                poster={movie.posterURLs.original}
              />
            </SwiperSlide>
          ))}
        {movies &&
          movies.length > 0 &&
          movies!.map((movie) => (
            <SwiperSlide key={movie.imdbID}>
              <MovieCard
                title={movie.title}
                year={movie.year}
                rating={movie.imdbRating}
                poster={movie.posterURLs.original}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default MovieSection;
