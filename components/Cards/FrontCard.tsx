import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

import useModal from "@/hooks/useModal";
import useMounted from "@/hooks/useMounted";

import styles from "./FrontCard.module.scss";

import Button from "../Buttons/Button";
import MovieModal from "../modals/MovieModal";
import Icon from "../UI/Icon";

const SLIDES = [
  {
    id: "tt0293429",
    img: "/mortal-front.webp",
    title: "Mortal Kombat",
    year: 2021,
    rating: 60,
    language: "en",
    runtime: 110,
    poster:
      "https://image.tmdb.org/t/p/original/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg",
    ovreview:
      "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
    description:
      "Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.",
    video: "-BQPKD7eozY",
  },
  {
    id: "tt1477834",
    img: "/aquaman-front.webp",
    title: "Aquaman",
    year: 2018,
    rating: 68,
    language: "en",
    runtime: 143,
    poster:
      "https://image.tmdb.org/t/p/original/zdw7Wf97vsQ0YnGomxDqfcEdUjX.jpg",
    ovreview:
      "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.",
    description:
      "Once home to the most advanced civilization on Earth, Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people and then the surface world. Standing in his way is Arthur Curry, Orm's half-human, half-Atlantean brother and true heir to the throne.",
    video: "WDkg3h8PCVU",
  },
  {
    id: "tt1877830",
    img: "/batman-front.webp",
    title: "The Batman",
    year: 2022,
    rating: 78,
    language: "en",
    runtime: 177,
    poster:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    ovreview:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    description:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    video: "mqqft2x_Aa4",
  },
];

const FrontCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { modalRef, modalState, showModal, closeModal } = useModal();
  const mounted = useMounted();

  const slideBackwardHandler = () => {
    setCurrentSlide((prev) => {
      if (prev == 0) return SLIDES.length - 1;
      else return (prev -= 1);
    });
  };

  const slideForwardHandler = () => {
    setCurrentSlide((prev) => {
      if (prev == SLIDES.length - 1) return 0;
      else return (prev += 1);
    });
  };

  useEffect(() => {
    let sliderInterval: ReturnType<typeof setTimeout>;

    if (!modalState) {
      sliderInterval = setInterval(() => slideForwardHandler(), 10000);
    }

    return () => clearInterval(sliderInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, SLIDES.length, modalState]);

  return (
    <>
      <div className={styles.frontcard}>
        <div className={styles.front_wrapper}>
          {SLIDES.map((slide, index) => (
            <Image
              key={index}
              src={slide.img}
              alt={`Poster of ${slide.title} movie`}
              className={currentSlide == index ? styles.active : ""}
              draggable={false}
              width={1800}
              height={600}
            />
          ))}
        </div>
        <div className={styles.description}>
          <div className={styles.info}>
            <h1 className={styles.title}>{SLIDES[currentSlide].title}</h1>
            <div className={styles.meta}>
              <span className={styles.year}>{SLIDES[currentSlide].year}</span> |
              <span className={styles.rate}>{`Rating: ${(
                SLIDES[currentSlide].rating / 10
              )
                .toFixed(1)
                .toString()
                .replace(".", ",")}`}</span>
            </div>
            <div className={styles.about}>{SLIDES[currentSlide].ovreview}</div>
          </div>
          <Button action={showModal}>
            <Icon icon="playOutline" />
            <span>Watch</span>
          </Button>
        </div>
        <div className={styles.previev}>
          <button onClick={slideBackwardHandler} className={styles.btn_left}>
            <Icon icon="arrow" />
          </button>
          <button onClick={slideForwardHandler} className={styles.btn_right}>
            <Icon icon="arrow" />
          </button>
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`${styles.image_wrapper} ${
                currentSlide == index ? styles.active : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <Image src={slide.img} alt="" fill />
            </div>
          ))}
        </div>
      </div>
      {mounted &&
        modalState &&
        createPortal(
          <MovieModal
            title={SLIDES[currentSlide].title}
            year={SLIDES[currentSlide].year}
            rating={SLIDES[currentSlide].rating}
            poster={SLIDES[currentSlide].poster}
            description={SLIDES[currentSlide].description}
            language={SLIDES[currentSlide].language}
            runtime={SLIDES[currentSlide].runtime}
            video={SLIDES[currentSlide].video}
            imdbID={SLIDES[currentSlide].id}
            modalRef={modalRef}
            closeModal={closeModal}
          />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default FrontCard;
