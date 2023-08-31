import React, { useRef, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/hooks/redux"
import { createPortal } from "react-dom"
import axios from "axios"

import { clear, addMessage, setMessages } from "@/store/message"

import styles from "./MessageModal.module.scss"

import Icon from "../UI/Icon"

const MessageModal = () => {
  const user = useAppSelector(state => state.messageData.user)
  const messages = useAppSelector(state => state.messageData.messages)
  const userEmail = useAppSelector(state => state.userData.email)

  const messageRef = useRef<HTMLInputElement>(null)
  const windowRef = useRef<HTMLUListElement>(null)

  const dispatch = useAppDispatch()

  const closeModalHandler = () => {
    dispatch(clear())
  }

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const messageValue = messageRef.current?.value!

    if (messageValue == "") return

    axios.post("/api/messages/add", {
      friendEmail: user?.email,
      message: messageValue,
    })

    dispatch(
      addMessage({
        message_from: userEmail!,
        message_content: messageValue,
        create_date: Date.now(),
        message_to: user?.email!,
      })
    )
    messageRef.current!.value = ""
  }

  useEffect(() => {
    const importMessages = async () => {
      const messages = await axios.get("/api/messages/get", {
        params: {
          friendEmail: user?.email,
        },
      })
      dispatch(setMessages(messages.data.messages))
    }

    importMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    windowRef.current!.scrollTo(0, windowRef.current!.scrollHeight)
  }, [messages])

  return createPortal(
    <div className={`modal ${styles.message_modal}`}>
      <div className={styles.header}>
        <span
          className={`${styles.name} ${user?.isOnline ? styles.online : ""}`}
        >
          {user?.name}
        </span>
        <button onClick={closeModalHandler} className={styles.close_button}>
          <Icon icon="closeOutline" />
        </button>
      </div>
      <ul ref={windowRef} className={styles.messages}>
        {messages.map((message, index) => (
          <li
            key={index}
            className={`${message.message_from == userEmail ? styles.own : ""}`}
          >
            {message.message_content}
          </li>
        ))}
      </ul>
      <form className={styles.text_area} onSubmit={sendMessageHandler}>
        <input ref={messageRef} type={"text"} placeholder="Type message..." />
        <button type="submit">
          <Icon icon="paperPlane" />
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  )
}

export default MessageModal
