import React from "react";
import Link from "next/link";

import SquareButton from "../Buttons/SquareButton";
import Icon from "../UI/Icon";

import styles from "./Community.module.scss";

const Community = () => {
  return (
    <section className={styles.community}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>
            <Icon icon="communityFill" />
            <span>Community</span>
          </h1>
          <h2>Choose section to visit :</h2>
        </div>
        <div className={styles.buttons}>
          <Link href="/community/discussions">
            <SquareButton icon={<Icon icon="discussOutline" />}>
              Discussions
            </SquareButton>
          </Link>
          <Link href="/community/members">
            <SquareButton icon={<Icon icon="membersOutline" />}>
              Members
            </SquareButton>
          </Link>
          {/* <Link href="/community/votes">
            <SquareButton icon={<Icon icon="voteOutline" />}>
              Weekly votes
            </SquareButton>
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default Community;
