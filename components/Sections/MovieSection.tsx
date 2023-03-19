import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
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
  // const [movies, setMovies] = useState<any[]>();

  // useEffect(() => {
  //   const getMovies = async () => {
  //     let genreId;
  //     try {
  //       const response = await axios.get(`/api/genres/${genre}`);
  //       genreId = response.data.id;
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     try {
  //       const response = await axios.get(`/api/movies/genres/${genreId}`);
  //       setMovies(response.data.data);
  //       await axios.post(`/api/insert`, {
  //         movies: response.data.data,
  //       });
  //       console.log(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getMovies();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["movies-home", { genre: genre }],
    queryFn: () => axios.get(`/api/movies/genre/${genre}`),
    refetchOnWindowFocus: false
  });

  console.log("first")

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
          (data! as any).data.movies.rows.map((movie: any, index : number) => (
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
                video={
                  "https://www.youtube.com/d3a8eb5d-d645-49f5-986d-07b180fe533e"
                }
              />
            </SwiperSlide>
          ))}
        {/* {movies &&
          movies.length > 0 &&
          movies!.map((movie) => (
            <SwiperSlide key={movie.imdbID}>
              <MovieCard
                title={movie.title}
                year={movie.year}
                rating={movie.imdbRating}
                poster={movie.posterURLs.original}
                description={movie.overview}
                language={movie.originalLanguage}
                runtime={movie.runtime}
                imdbID={movie.imdbID}
                video={
                  "https://www.youtube.com/d3a8eb5d-d645-49f5-986d-07b180fe533e"
                }
              />
            </SwiperSlide>
          ))} */}
      </Swiper>
    </section>
  );
};

export default MovieSection;
