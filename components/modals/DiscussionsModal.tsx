import React, { useRef } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "react-query";

import Button from "../Buttons/Button";

import styles from "./DiscussionsModal.module.scss";

interface modalProps {
  modalRef: any;
  closeModal: () => void;
}

const DiscussionsModal: React.FC<modalProps> = ({ modalRef, closeModal }) => {
  const subjectRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const queryClient = useQueryClient();

  const requestHandler = (data: { subject: string; description: string }) => {
    return axios.post(`/api/discussions/add`, {
      subject: data.subject,
      description: data.description,
    });
  };

  const discussionMutation = useMutation({
    mutationFn: requestHandler,
    onSuccess: () => {
      queryClient.invalidateQueries("discussions");
      closeModal();
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    discussionMutation.mutate({
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
