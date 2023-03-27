import React from "react";

import styles from "./UserButtons.module.scss";

import UserButton from "./UserButton";
import Icon from "@/components/UI/Icon";

const USER_BUTTONS = [
  {
    icon: <Icon icon="giftOutline" />,
    isMarked: false,
    user: false,
    modalData: { header: "Gifts", emptyText: "You don't have any gifts" },
  },
  {
    icon: <Icon icon="messageOutline" />,
    isMarked: false,
    user: false,
    modalData: { header: "Messages", emptyText: "You don't have any messages" },
  },
  {
    icon: <Icon icon="bellOutline" />,
    isMarked: true,
    user: false,
    modalData: {
      header: "Notifications",
      emptyText: "You don't have any notifications",
    },
  },
  {
    icon: <Icon icon="userAvatar" />,
    isMarked: false,
    user: true,
  },
];

const UserButtons = () => {
  return (
    <div className={styles.buttons}>
      {USER_BUTTONS.map((button, index) => (
        <UserButton
          key={index}
          icon={button.icon}
          isMarked={button.isMarked}
          user={button.user}
          modal={button.modalData!}
        />
      ))}
    </div>
  );
};

export default UserButtons;
