import React from "react"

import useModal from "@/hooks/useModal"

import NotificationModal from "@/components/modals/NotificationModal"
import LogoutModal from "@/components/modals/LogoutModal"
import IconButton from "@/components/Buttons/IconButton"

import styles from "./UserButton.module.scss"

interface buttonProps {
  children: JSX.Element
  id?: string
  data?: any[]
  modal?: {
    header: string
    emptyText: string
  }
}

const UserButton: React.FC<buttonProps> = ({ children, id, modal, data }) => {
  const { modalRef, modalState, showModal } = useModal()

  return (
    <div
      className={`${styles.container} ${
        data && data!.length > 0 ? styles.marked : ""
      } ${id == "user-avatar" ? styles.avatar : ""}`}
    >
      <IconButton id={id} action={showModal}>
        {children}
      </IconButton>
      {modalState &&
        (id == "user-avatar" ? (
          <LogoutModal modalRef={modalRef} />
        ) : (
          <NotificationModal
            modalRef={modalRef}
            header={modal!.header}
            emptyText={modal!.emptyText}
            data={data}
          />
        ))}
    </div>
  )
}

export default UserButton
