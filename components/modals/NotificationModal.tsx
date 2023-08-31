import React from "react"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"

import Icon from "../UI/Icon"
import PinnedButton from "../Buttons/PinnedButton"

import styles from "./NotificationModal.module.scss"

interface modalProps {
  header: string
  emptyText: string
  modalRef: any
  data?: any[any]
}

const NotificationModal: React.FC<modalProps> = ({
  header,
  emptyText,
  modalRef,
  data,
}) => {
  const queryClient = useQueryClient()

  const updateStatusRequest = (data: { email: string; status: string }) => {
    return axios.put(`/api/friends/update-status`, {
      email: data.email,
      status: data.status,
    })
  }

  const updateMutation = useMutation({
    mutationFn: updateStatusRequest,
    onSuccess: () => {
      queryClient.invalidateQueries("friends")
      queryClient.invalidateQueries("friend-requests")
    },
  })

  const updateFriendStatusHandler = (email: string, status: string) => {
    updateMutation.mutate({
      email,
      status,
    })
  }

  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <h3 className={styles.header}>{header}</h3>
      <ul className={styles.list}>
        {data && data!.length > 0 ? (
          data?.map((item: any) => (
            <li key={item.id} className={styles.notification}>
              <Icon icon="userAvatar" />
              <p>
                User named <span>{item.username}</span> sent you friend request.
              </p>
              <div className={styles.buttons}>
                <PinnedButton
                  action={() =>
                    updateFriendStatusHandler(item.request_from, "accepted")
                  }
                >
                  <Icon icon="friendAdd" />
                </PinnedButton>
                <PinnedButton
                  action={() =>
                    updateFriendStatusHandler(item.request_from, "declined")
                  }
                >
                  <Icon icon="closeOutline" />
                </PinnedButton>
              </div>
            </li>
          ))
        ) : (
          <span className={styles.empty_text}>{emptyText}</span>
        )}
      </ul>
    </div>
  )
}

export default NotificationModal
