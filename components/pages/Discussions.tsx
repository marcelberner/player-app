import React from "react";
import { createPortal } from "react-dom";

import useModal from "@/hooks/useModal";
import useMounted from "@/hooks/useMounted";

import PinnedButton from "../Buttons/PinnedButton";
import DiscussionsModal from "../modals/DiscussionsModal";
import Icon from "../UI/Icon";

import styles from "./Discuss.module.scss";

const Discussions = () => {
  const { modalRef, showModal, modalState } = useModal();
  const mounted = useMounted();

  return (
    <>
      <section className={styles.discussions}>
        <div className={styles.template}>
          <span>Subject</span>
          <span>Overviev</span>
          <span>Comments</span>
          <span>Author</span>
          <span>Date</span>
        </div>
        <PinnedButton action={showModal}>
          <Icon icon="pencilOutline" />
        </PinnedButton>
      </section>
      {mounted &&
        modalState &&
        createPortal(
          <DiscussionsModal modalRef={modalRef} />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default Discussions;
