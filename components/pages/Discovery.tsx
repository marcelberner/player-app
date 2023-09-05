import React, { useRef, useState } from "react"
import axios from "axios"
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query"
import qs from "qs"

import MovieCard from "../Cards/MovieCard"
import CategoryLabel from "../Labels/CategoryLabel"
import PageLoader from "../UI/PageLoader"
import IconButton from "../Buttons/IconButton"
import Icon from "../UI/Icon"
import InfiniteList from "../Lists/InfiniteList"
import Option from "../Inputs/Option"
import Text from "../Inputs/Text"

import styles from "./Discovery.module.scss"

const Discovery = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const yearStartRef = useRef<HTMLInputElement>(null)
  const yearEndRef = useRef<HTMLInputElement>(null)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [filteredGenres, setFilteredGenres] = useState<string[]>([])

  const queryClient = useQueryClient()

  const { data, isLoading: isLoadingGenres } = useQuery({
    queryKey: "genres",
    queryFn: () => axios.get("/api/genres"),
    refetchOnWindowFocus: false,
  })

  const genreFilterHandler = (genre: string) => {
    const isIncludingGenre = filteredGenres.includes(`'${genre}'`)

    if (isIncludingGenre) {
      const newArray = filteredGenres.filter(genre => genre !== genre)
      setFilteredGenres(newArray)
    } else {
      setFilteredGenres(prev => [...prev, `'${genre}'`])
    }
  }

  const {
    data: movieData,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["discovery", { filters: filteredGenres }],
    getNextPageParam: (prevData: any) => prevData.data.next,
    queryFn: ({ pageParam = 1, queryKey }) => {
      const keyword = inputRef.current!.value
      const yearStart = yearStartRef.current!.value
      const yearEnd = yearEndRef.current!.value

      return axios.get(`/api/movies`, {
        params: {
          page: pageParam,
          keyword: keyword,
          genres: filteredGenres,
          yearStart: yearStart,
          yearEnd: yearEnd,
        },
        paramsSerializer: {
          serialize: params => {
            return qs.stringify(params, { arrayFormat: "repeat" })
          },
        },
      })
    },
    refetchOnWindowFocus: false,
  })

  const filterExpandHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setIsExpanded(prev => !prev)
  }

  if (isLoadingGenres) return <PageLoader />

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
            <Text inputRef={inputRef} placeholder="Keyword..." />
            <IconButton action={filterExpandHandler}>
              <Icon icon={isExpanded ? "closeOutline" : "filterOutline"} />
            </IconButton>
          </div>
          <CategoryLabel>Genres</CategoryLabel>
          <div className={styles.options}>
            {data!.data.genres.map((genre: any) => (
              <Option key={genre.id} id={genre.id} action={genreFilterHandler}>
                {genre.genre}
              </Option>
            ))}
          </div>
          <CategoryLabel>Year</CategoryLabel>
          <div className={styles.options}>
            <Text inputRef={yearStartRef} placeholder="From" />
            <Text inputRef={yearEndRef} placeholder="To" />
          </div>
        </form>
      </div>
      <InfiniteList
        display="grid"
        hasNextPage={hasNextPage!}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
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
      </InfiniteList>
    </section>
  )
}

export default Discovery
