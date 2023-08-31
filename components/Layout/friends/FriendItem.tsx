import React, { useState } from "react"
import { createPortal } from "react-dom"

import { useAppSelector } from "@/hooks/redux"

import useModal from "@/hooks/useModal"
import useMounted from "@/hooks/useMounted"

import styles from "./FriendItem.module.scss"

import UserModal from "@/components/modals/UserModal"
import Icon from "@/components/UI/Icon"

interface friendProps {
  id: string
  name: string
  isOnline: boolean
  state: boolean
  email: string
}

const FriendItem: React.FC<friendProps> = ({
  id,
  name,
  isOnline,
  state,
  email,
}) => {
  const { modalRef, modalState, showModal, closeModal } = useModal()
  const mounted = useMounted()

  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>()

  const sidebarState = useAppSelector(state => state.sidebarData.isHidden)

  const showModalHandler = (event: React.MouseEvent) => {
    if (window.innerWidth <= 640) {
      showModal()
      return
    }

    let positionX = sidebarState ? 230 : 50
    let positionY = event.clientY - 20

    if (positionY + 180 > window.innerHeight) {
      positionY = window.innerHeight - 190
    }

    const cursorPosition = {
      x: positionX,
      y: positionY,
    }

    showModal()
    setCursorPosition(cursorPosition)
  }

  return (
    <>
      <li
        onClick={showModalHandler}
        className={`${styles.friend}  ${isOnline ? styles.online : ""} ${
          state ? styles.mark : ""
        }`}
      >
        <Icon icon="userAvatar" />
        {state && <span className={styles.name}>{name}</span>}
      </li>
      {mounted &&
        modalState &&
        createPortal(
          <UserModal
            modalRef={modalRef}
            id={id}
            name={name}
            email={email}
            position={cursorPosition!}
            isOnline={isOnline}
            closeModal={closeModal}
          />,
          document.getElementById("modal")!
        )}
    </>
  )
}

export default FriendItem
