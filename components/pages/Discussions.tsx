import React from "react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

import useModal from "@/hooks/useModal";
import useMounted from "@/hooks/useMounted";

import PinnedButton from "../Buttons/PinnedButton";
import DiscussionsModal from "../modals/DiscussionsModal";
import Icon from "../UI/Icon";
import Button from "../Buttons/Button";
import NavLabel from "../Labels/NavLabel";

import styles from "./Discuss.module.scss";

interface postProps {
  id: string;
  subject: string;
  description: string;
  username: string;
  create_date: string;
}

const Discussions = () => {
  const { modalRef, showModal, modalState, closeModal } = useModal();
  const mounted = useMounted();

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: "discussions",
    queryFn: () => axios.get("/api/discussions/get"),
    refetchOnWindowFocus: false,
  });

  const navigateHandler = (path: string) => {
    router.push(`/community/discussions/${path}`);
  };

  return (
    <>
      <section className={styles.discussions}>
        <NavLabel>
          <Icon icon="communityFill" />
        </NavLabel>
        <div className={styles.template}>
          <span>Subject</span>
          <span>Overviev</span>
          <span>Comments</span>
          <span>Author</span>
          <span>Date</span>
        </div>
        <ul className={styles.discussions_content}>
          {!isLoading &&
            (data?.data.discussions.length > 0 ? (
              data?.data.discussions.map((post: postProps) => {
                const date = new Date(post.create_date)
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join(".");

                return (
                  <li
                    key={post.id}
                    className={styles.post_item}
                    onClick={() => navigateHandler(post.id)}
                  >
                    <span>{post.subject}</span>
                    <span>{post.description}</span>
                    <span>3</span>
                    <span>{post.username}</span>
                    <span>{date}</span>
                  </li>
                );
              })
            ) : (
              <div className={styles.no_content}>
                <h3>Nothing to discuss?</h3>
                <h4>Make your first discussion.</h4>
                <Button action={showModal}>Create discussion</Button>
              </div>
            ))}
        </ul>
        <PinnedButton action={showModal}>
          <Icon icon="pencilOutline" />
        </PinnedButton>
      </section>
      {mounted &&
        modalState &&
        createPortal(
          <DiscussionsModal modalRef={modalRef} closeModal={closeModal} />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default Discussions;
