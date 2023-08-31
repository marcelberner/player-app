import React from "react"

import styles from "./SquareButton.module.scss"

interface buttonProps {
  children: JSX.Element | string
  icon: JSX.Element
}

const SquareButton: React.FC<buttonProps> = ({ icon, children }) => {
  return (
    <button className={styles.square_button}>
      {icon}
      <span>{children}</span>
    </button>
  )
}

export default SquareButton
