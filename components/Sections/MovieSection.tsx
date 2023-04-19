import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";

import styles from "./MovieSection.module.scss";

import CategoryLabel from "../Labels/CategoryLabel";
import MovieCard from "../Cards/MovieCard";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface SectionProps {
  genre: string;
}

const MovieSection: React.FC<SectionProps> = ({ genre }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies-home", { genre: genre }],
    queryFn: () => axios.get(`/api/movies/genre/${genre}`),
    refetchOnWindowFocus: false,
  });

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
        {!isLoading &&
          (data! as any).data.movies.rows.length > 0 &&
          (data! as any).data.movies.rows.map((movie: any, index: number) => (
            <SwiperSlide key={index}>
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
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default MovieSection;
