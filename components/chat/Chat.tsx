import React, { useRef, useState } from "react"
import styles from "./Chat.module.scss"

import { useAppSelector } from "@/hooks/redux"

import Icon from "../UI/Icon"

const Chat = () => {
  const username = useAppSelector(state => state.userData.username)!
  const [messages, setMessages] = useState<
    {
      username: string
      message: string
    }[]
  >([])

  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const currentValue = inputRef.current?.value!
    setMessages(prev => [...prev, { username, message: currentValue }])

    inputRef.current!.value = ""
  }

  return (
    <div className={styles.chat}>
      <ul className={styles.messages}>
        {messages.map((message, index) => (
          <li key={index} className={styles.message}>
            <span className={styles.nick}>{message.username}</span>
            <span className={styles.text}>{message.message}</span>
          </li>
        ))}
      </ul>
      <form className={styles.text_area} onSubmit={sendMessageHandler}>
        <input ref={inputRef} type="text" placeholder="Send message..." />
        <button type="submit">
          <Icon icon="paperPlane" />
        </button>
      </form>
    </div>
  )
}

export default Chat
