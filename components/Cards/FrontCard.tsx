import React from "react";
import Image from "next/image";
import { BsPlay } from "react-icons/bs";

import styles from "./FrontCard.module.scss";

import Button from "../Buttons/Button";

const FrontCard = () => {
  return (
    <div className={styles.frontcard}>
      <Image src="/front.jpg" alt="wdawd" width={1800} height={600} />
      <div className={styles.description}>
        <h1 className={styles.title}>Mortal Kombat</h1>
        <div className={styles.meta}>
          <span className={styles.year}>2021</span> |
          <span className={styles.rate}>Rating: 5,8</span>
        </div>
        <div className={styles.about}>
          MMA fighter Cole Young seeks out Earth&apos;s greatest champions in order
          to stand against the enemies of Outworld in a high stakes battle for
          the universe.
        </div>
        <Button>
          <BsPlay />
          <span>Watch</span>
        </Button>
      </div>
    </div>
  );
};

export default FrontCard;
