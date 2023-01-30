import React from "react";
import Image from "next/image";
import { BsPlay } from "react-icons/bs";

import styles from "./FrontCard.module.scss";

import Button from "../Buttons/Button";

const FrontCard = () => {
  return (
    <div className={styles.frontcard}>
      <Image src="/front.jpg" alt="wdawd" width={1600} height={400} />
      <div className={styles.description}>
        <h1 className={styles.title}>Mortal Kombat</h1>
        <div className={styles.meta}>
          <span className={styles.year}>2021</span> |
          <span className={styles.rate}>Ocena: 5,8</span>
        </div>
        <div className={styles.about}>
          Wojownicy podróżują do świątyni boga Raidena, aby przygotować się do
          krwawego turnieju zwanego jako Mortal Kombat.
        </div>
        <Button>
          <BsPlay />
          <span>Oglądaj</span>
        </Button>
      </div>
    </div>
  );
};

export default FrontCard;
