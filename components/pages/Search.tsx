import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useInfiniteQuery } from "react-query"
import axios from "axios"

import MovieCard from "../Cards/MovieCard"
import MovieCardWide from "../Cards/MovieCardWide"
import IconButton from "../Buttons/IconButton"
import Icon from "../UI/Icon"
import PageLoader from "../UI/PageLoader"
import InfiniteList from "../Lists/InfiniteList"

import styles from "./Search.module.scss"

const Search = () => {
  const router = useRouter()

  const [display, setDisplay] = useState<"row" | "grid">("row")

  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["search", { query: router.query.query }],
      getNextPageParam: (prevData: any) => prevData.data.next,
      queryFn: ({ pageParam = 1 }) =>
        axios.get(`/api/movies/title/${router.query.query}`, {
          params: { page: pageParam },
        }),
      refetchOnWindowFocus: false,
    })

  useEffect(() => {
    if (window.innerWidth <= 640) setDisplay("grid")
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <section className={styles.search_results}>
      <div className={styles.header}>
        <h1>
          {data?.pages.flatMap((data: any) => data.data.movies).length == 0
            ? `No results for „${router.query.query}”`
            : `Search results for „${router.query.query}”`}
        </h1>
        <div
          className={`
          ${styles.display_buttons} 
          ${display === "grid" ? styles.grid : styles.row}
        `}
        >
          <IconButton action={() => setDisplay("grid")}>
            <Icon icon="displayGrid" />
          </IconButton>
          <IconButton action={() => setDisplay("row")}>
            <Icon icon="displayRow" />
          </IconButton>
        </div>
      </div>

      <InfiniteList
        display={display}
        hasNextPage={hasNextPage!}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      >
        {data!.pages
          .flatMap((data: any) => data.data.movies)
          .map((movie, index: number) =>
            display === "grid" ? (
              <li key={index}>
                <MovieCard
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
              </li>
            ) : (
              <li key={index}>
                <MovieCardWide
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
              </li>
            )
          )}
      </InfiniteList>
    </section>
  )
}

export default Search
