import React from "react";

import styles from "./Player.module.scss";

interface playerProps {
  video: string;
}

const Player: React.FC<playerProps> = ({ video }) => {
  return <video className={styles.player} src={video} controls></video>;
};

export default Player;
