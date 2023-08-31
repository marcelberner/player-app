import React from "react"
import axios from "axios"
import { useQuery } from "react-query"

import styles from "./UserButtons.module.scss"

import UserButton from "./UserButton"
import Icon from "@/components/UI/Icon"

interface buttonsProps {
  searchbarState: boolean
}

const UserButtons: React.FC<buttonsProps> = ({ searchbarState }) => {
  const { data, isLoading } = useQuery({
    queryKey: "friend-requests",
    queryFn: () => axios.get("/api/friends/receive"),
    refetchOnWindowFocus: false,
  })

  return !searchbarState ? (
    <div className={styles.buttons}>
      <UserButton
        id="gifts-btn"
        modal={{ header: "Gifts", emptyText: "You don't have any gifts" }}
      >
        <Icon icon="giftOutline" />
      </UserButton>
      <UserButton
        id="messages-btn"
        modal={{ header: "Messages", emptyText: "You don't have any messages" }}
      >
        <Icon icon="messageOutline" />
      </UserButton>
      <UserButton
        id="notifications-btn"
        data={data?.data.requests}
        modal={{
          header: "Notifications",
          emptyText: "You don't have any notifications",
        }}
      >
        <Icon icon="bellOutline" />
      </UserButton>
      <UserButton id="user-avatar">
        <Icon icon="userAvatar" />
      </UserButton>
    </div>
  ) : null
}

export default UserButtons
