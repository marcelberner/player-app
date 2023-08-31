import React from "react"

import Loader from "../UI/Loader"

import styles from "./Button.module.scss"

interface buttonProps {
  children: string | JSX.Element | JSX.Element[]
  outline?: boolean
  action?: () => void
  isLoading?: boolean
}

const Button: React.FC<buttonProps> = ({
  children,
  outline,
  action,
  isLoading,
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={action}
      className={`${styles.button} ${outline ? styles.outline : ""}`}
    >
      {isLoading ? <Loader /> : children}
    </button>
  )
}

export default Button
