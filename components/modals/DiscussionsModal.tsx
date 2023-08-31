import React, { useRef } from "react"
import axios from "axios"
import { useQueryClient, useMutation } from "react-query"

import useValidate from "@/hooks/useValidate"

import Button from "../Buttons/Button"

import styles from "./DiscussionsModal.module.scss"

interface modalProps {
  modalRef: any
  closeModal: () => void
}

const DiscussionsModal: React.FC<modalProps> = ({ modalRef, closeModal }) => {
  const subjectRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()

  const [isSubjectValid, validateSubject, clearSubject] = useValidate({
    inputRef: subjectRef,
    isEmpty: true,
  })
  const [isDescriptionValid, validateDescription, clearDescription] =
    useValidate({ inputRef: descriptionRef, isEmpty: true })

  const queryClient = useQueryClient()

  const requestHandler = (data: { subject: string; description: string }) => {
    return axios.post(`/api/discussions/add`, {
      subject: data.subject,
      description: data.description,
    })
  }

  const discussionMutation = useMutation({
    mutationFn: requestHandler,
    onSuccess: () => {
      queryClient.invalidateQueries("discussions")
      closeModal()
    },
  })

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const validSubject = validateSubject()
    const validDescription = validateDescription()

    if (!validSubject || !validDescription) return

    discussionMutation.mutate({
      subject: subjectRef.current!.value,
      description: descriptionRef.current!.value,
    })
  }

  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <h2>New discussion</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="discussion-subject">Subject:</label>
        {!isSubjectValid && (
          <span className={styles.invalid_message}>
            Subject can&apos;t be empty
          </span>
        )}
        <input
          ref={subjectRef as any}
          id="discussion-subject"
          placeholder="What will the topic be about?"
          onChange={clearSubject}
        />
        <label htmlFor="discussion-content">Description:</label>
        {!isDescriptionValid && (
          <span className={styles.invalid_message}>
            Description can&apos;t be empty
          </span>
        )}
        <textarea
          ref={descriptionRef as any}
          id="discussion-content"
          placeholder="Describe the topic..."
          onChange={clearDescription}
        ></textarea>
        <Button>Share</Button>
      </form>
    </div>
  )
}

export default DiscussionsModal
