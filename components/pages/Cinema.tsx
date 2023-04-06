import React from "react";

import styles from "./Cinema.module.scss";

import Chat from "../chat/Chat";
import Player from "../Players/Player";
import Icon from "../UI/Icon";

const Cinema = () => {
  return (
    <section className={styles.cinema}>
      {/* <Chat /> */}
      <Player video="https://vcze603.cda.pl/-2Rtu40F9gbNTvO1TydxoA/1677576715/lq62f5ca2539107881d6a752103098ccdd.mp4" />
      <div className={styles.container}>
        <h1 className={styles.title}>
          The Lord of the Rings: The Fellowship of the Ring
        </h1>
        <span className={styles.year}>(2001)</span>
        <span className={styles.viewers}>
          <Icon icon="usersLive" /> 100
        </span>
      </div>
      <div className={styles.description}>
        <img
          src="https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY576_.jpg"
          alt="movie"
        />
        <p>
          An ancient Ring thought lost for centuries has been found, and through
          a strange twist of fate has been given to a small Hobbit named Frodo.
          When Gandalf discovers the Ring is in fact the One Ring of the Dark
          Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in
          order to destroy it. However, he does not go alone. He is joined by
          Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his
          three Hobbit friends Merry, Pippin, and Samwise. Through mountains,
          snow, darkness, forests, rivers and plains, facing evil and danger at
          every corner the Fellowship of the Ring must go. Their quest to
          destroy the One Ring is the only hope for the end of the Dark Lords
          reign.
        </p>
      </div>
    </section>
  );
};

export default Cinema;
