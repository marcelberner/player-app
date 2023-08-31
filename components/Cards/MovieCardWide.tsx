import React from "react"
import { createPortal } from "react-dom"
import Image from "next/dist/client/image"

import useMounted from "@/hooks/useMounted"
import useModal from "@/hooks/useModal"

import styles from "./MovieCardWide.module.scss"

import MovieModal from "../modals/MovieModal"
import Icon from "../UI/Icon"
import PosterPlaceholder from "../UI/placeholders/PosterPlaceholder"

interface movieProps {
  title: string
  year: number
  rating: number
  poster: string
  language?: string
  description?: string
  runtime?: number
  video: string
  imdbID: string
}

const MovieCardWide: React.FC<movieProps> = ({
  title,
  year,
  rating,
  poster,
  description,
  language,
  runtime,
  imdbID,
  video,
}) => {
  const mounted = useMounted()
  const { modalRef, modalState, showModal, closeModal } = useModal()
  return (
    <>
      <div onClick={showModal} className={styles.card}>
        <h3>{title}</h3>
        <div className={styles.info}>
          <span className={styles.year}>{year}</span>
          <div className={styles.rate}>
            <Icon icon="starOutline" />
            <span>{(rating / 10).toFixed(1).toString().replace(".", ",")}</span>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.img_container}>
          {poster != "undefined" ? (
            <Image src={poster} width={200} height={285} alt={title} />
          ) : (
            <PosterPlaceholder />
          )}
        </div>
      </div>
      {mounted &&
        modalState &&
        createPortal(
          <MovieModal
            title={title}
            year={year}
            rating={rating}
            poster={poster}
            description={description}
            language={language}
            runtime={runtime}
            video={video}
            imdbID={imdbID}
            modalRef={modalRef}
            closeModal={closeModal}
          />,
          document.getElementById("modal")!
        )}
    </>
  )
}

export default MovieCardWide
