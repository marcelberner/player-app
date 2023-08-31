import React from "react"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

import { useAppDispatch } from "@/hooks/redux"
import { setUser } from "@/store/message"

import styles from "./UserModal.module.scss"

import Button from "../Buttons/Button"
import Icon from "../UI/Icon"

interface modalProps {
  id: string
  name: string
  isOnline: boolean
  modalRef: any
  email: string
  position?: {
    x: number
    y: number
  }
  closeModal: (event?: any) => void
}

const UserModal: React.FC<modalProps> = ({
  id,
  name,
  position,
  isOnline,
  modalRef,
  email,
  closeModal,
}) => {
  const dispatch = useAppDispatch()

  const queryClient = useQueryClient()

  const showMessageHandler = () => {
    dispatch(setUser({ email, isOnline, name }))
    closeModal()
  }

  const removeFriend = (data: any) =>
    axios.delete(`/api/friends/remove`, {
      params: { friendEmail: data.friendEmail },
    })

  const friendRemoveMutation = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries("friends")
    },
  })

  const removeFriendHandler = () => {
    closeModal()
    friendRemoveMutation.mutate({
      friendEmail: email,
    })
  }

  return (
    <div
      ref={modalRef}
      className={`modal ${styles.modal}`}
      style={position && { top: position.y, left: position.x + 30 }}
    >
      <div className={styles.header}>
        <div className={`${styles.data} ${!isOnline ? styles.online : ""}`}>
          <Icon icon="userAvatar" />
          <span>{name}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button action={showMessageHandler}>Message</Button>
        <Button action={removeFriendHandler} outline>
          Remove
        </Button>
      </div>
    </div>
  )
}

export default UserModal
