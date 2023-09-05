import React from "react"

import styles from "./Option.module.scss"

interface optionProps {
  id?: string
  children: string
  action: (genre: string) => void
}

const Option: React.FC<optionProps> = ({ id, children, action }) => {
  return (
    <div className={styles.option} key={id}>
      <input type="checkbox" className={"genre_option"} id={id} />
      <label onClick={action.bind(this, children)} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

export default Option
