import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./FrontCard.module.scss";

import Button from "../Buttons/Button";
import Icon from "../UI/Icon";

const SLIDES = [
  {
    img: "/mortal-front.webp",
    title: "Mortal Kombat",
    year: "2021",
    rating: "5,8",
    description:
      "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
  },
  {
    img: "/aquaman-front.webp",
    title: "Aquaman",
    year: "2018",
    rating: "6,8",
    description:
      "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.",
  },
  {
    img: "/batman-front.webp",
    title: "Batman",
    year: "2022",
    rating: "7,8",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
  },
];

const FrontCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    const sliderInterval = setInterval(() => slideForwardHandler(), 10000);

    return () => clearInterval(sliderInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, SLIDES.length]);

  return (
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
            <span
              className={styles.rate}
            >{`Rating: ${SLIDES[currentSlide].rating}`}</span>
          </div>
          <div className={styles.about}>{SLIDES[currentSlide].description}</div>
        </div>
        <Button>
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
  );
};

export default FrontCard;
