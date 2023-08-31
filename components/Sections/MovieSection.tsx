import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Thumbs } from "swiper"

import styles from "./MovieSection.module.scss"

import CategoryLabel from "../Labels/CategoryLabel"
import MovieCard from "../Cards/MovieCard"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/thumbs"

interface SectionProps {
  genre: string
  movies: any[]
}

const MovieSection: React.FC<SectionProps> = ({ genre, movies }) => {
  return (
    <section className={styles.section}>
      <CategoryLabel>{genre}</CategoryLabel>
      <Swiper
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className={styles.list}
        slidesPerView={"auto"}
        spaceBetween={30}
      >
        {movies.map((movie: any, index) => (
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
  )
}

export default MovieSection
