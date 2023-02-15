import React from "react";

import styles from "./Player.module.scss";

const Player = () => {
  return (
    <video
      className={styles.player}
      src="https://vwaw389.cda.pl/e3SiwAFU9o--Mf8rqiWymw/1676276023/lq3fd7c21b842921f731cb1f5fc1444d29.mp4"
      controls
    ></video>
  );
};

export default Player;
