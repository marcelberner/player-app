import React, { useRef } from "react";
import axios from "axios";

import Button from "../Buttons/Button";

import styles from "./DiscussionsModal.module.scss";

interface modalProps {
  modalRef: any;
}

const DiscussionsModal: React.FC<modalProps> = ({ modalRef }) => {
  const subjectRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const response = axios.post(`/api/discussions/add`, {
      subject: subjectRef.current!.value,
      description: descriptionRef.current!.value,
    });
  };
  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <h2>New discussion</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="discussion-subject">Subject:</label>
        <input
          ref={subjectRef as any}
          id="discussion-subject"
          placeholder="What will the topic be about?"
        />
        <label htmlFor="discussion-content">Description:</label>
        <textarea
          ref={descriptionRef as any}
          id="discussion-content"
          placeholder="Describe the topic..."
        ></textarea>
        <Button>Share</Button>
      </form>
    </div>
  );
};

export default DiscussionsModal;
