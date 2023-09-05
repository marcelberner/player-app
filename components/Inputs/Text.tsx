import React from "react"

import styles from "./Text.module.scss"

interface textProps {
  inputRef?: React.RefObject<HTMLInputElement>
  placeholder?: string
  outline?: boolean
}

const Text: React.FC<textProps> = ({ inputRef, placeholder, outline }) => {
  return (
    <input
      ref={inputRef}
      type="text"
      className={`${styles.text} ${outline ? styles.outline : null}`}
      placeholder={placeholder}
    />
  )
}

export default Text
