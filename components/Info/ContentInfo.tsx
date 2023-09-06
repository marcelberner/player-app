import React from "react"

import styles from "./ContentInfo.module.scss"

interface contentProps {
  children: string
}

const ContentInfo: React.FC<contentProps> = ({ children }) => {
  return <h2 className={styles.info}>{children}</h2>
}

export default ContentInfo
