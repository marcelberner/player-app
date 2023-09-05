import React from "react"
import useInfiniteScroll from "@/hooks/useInfiniteScroll."

import styles from "./InfiniteList.module.scss"

interface ListProps {
  children: any
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  display: "grid" | "row"
}

const InfiniteList: React.FC<ListProps> = ({
  children,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  display,
}) => {
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <ul
      className={`${styles.infinite} ${
        display == "grid" ? styles.grid : styles.row
      }`}
    >
      {children}
      <li ref={observerRef}></li>
    </ul>
  )
}

export default InfiniteList
