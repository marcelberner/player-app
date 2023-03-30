import React from "react";
import Link from "next/link";

import SquareButton from "../Buttons/SquareButton";
import Icon from "../UI/Icon";

import styles from "./Community.module.scss";

const Community = () => {
  return (
    <section className={styles.community}>
      <Link href="/community/discuss">
        <SquareButton icon={<Icon icon="discussOutline" />}>
          Discuss
        </SquareButton>
      </Link>
      <Link href="/community/members">
        <SquareButton icon={<Icon icon="membersOutline" />}>
          Members
        </SquareButton>
      </Link>
    </section>
  );
};

export default Community;
