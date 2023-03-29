import React from "react";

import styles from "./UserButtons.module.scss";

import UserButton from "./UserButton";
import Icon from "@/components/UI/Icon";

const USER_BUTTONS = [
  {
    icon: <Icon icon="giftOutline" />,
    id: "gifts-btn",
    modalData: { header: "Gifts", emptyText: "You don't have any gifts" },
    allert: false,
  },
  {
    icon: <Icon icon="messageOutline" />,
    id: "messages-btn",
    modalData: { header: "Messages", emptyText: "You don't have any messages" },
    allert: false,
  },
  {
    icon: <Icon icon="bellOutline" />,
    id: "notifications-btn",
    modalData: {
      header: "Notifications",
      emptyText: "You don't have any notifications",
    },
    allert: false,
  },
  {
    icon: <Icon icon="userAvatar" />,
    id: "user-avatar",
  },
];

const UserButtons = () => {
  return (
    <div className={styles.buttons}>
      {USER_BUTTONS.map((button, index) => (
        <UserButton
          key={index}
          id={button.id}
          icon={button.icon}
          modal={button.modalData!}
          allert={button.allert}
        />
      ))}
    </div>
  );
};

export default UserButtons;
