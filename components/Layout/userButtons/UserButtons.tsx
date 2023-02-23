import React from "react";
import { TbMessage2, TbGift } from "react-icons/tb";
import { BiBell } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

import UserButton from "./UserButton";

import styles from "./UserButtons.module.scss";

const USER_BUTTONS = [
  {
    icon: <TbGift />,
    isMarked: false,
    user: false,
    modalData: { header: "Gifts", emptyText: "You don't have any gifts" },
  },
  {
    icon: <TbMessage2 />,
    isMarked: false,
    user: false,
    modalData: { header: "Messages", emptyText: "You don't have any messages" },
  },
  {
    icon: <BiBell />,
    isMarked: true,
    user: false,
    modalData: { header: "Notifications", emptyText: "You don't have any notifications" },
  },
  {
    icon: <FaUserCircle />,
    isMarked: false,
    user: true,
    modalData: { header: "Placeholder", emptyText: "You don't have any gifts" },
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
