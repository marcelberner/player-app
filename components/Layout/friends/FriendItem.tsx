import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { createPortal } from "react-dom";

import { useAppSelector } from "@/hooks/redux";

import useModal from "@/hooks/useModal";
import useMounted from "@/hooks/useMounted";

import styles from "./FriendItem.module.scss";

import UserModal from "@/components/modals/UserModal";

interface friendProps {
  id: string;
  name: string;
  isOnline: boolean;
  state: boolean;
}

const FriendItem: React.FC<friendProps> = ({ id, name, isOnline, state }) => {
  const { modalRef, modalState, showModal, closeModal } = useModal();
  const mounted = useMounted();

  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>();

  const sidebarState = useAppSelector((state) => state.sidebarData.isHidden);

  const showModalHandler = (event: React.MouseEvent) => {
    let positionX = sidebarState ? 230 : 50;
    let positionY = event.clientY - 20;

    if (positionY + 180 > window.innerHeight) {
      positionY = window.innerHeight - 190;
    }

    const cursorPosition = {
      x: positionX,
      y: positionY,
    };

    showModal();
    setCursorPosition(cursorPosition);
  };

  return (
    <>
      <li
        onClick={showModalHandler}
        className={`${styles.friend}  ${isOnline ? styles.online : ""} ${
          state ? styles.mark : ""
        }`}
      >
        <FaUserCircle />
        {state && <span className={styles.name}>{name}</span>}
      </li>
      {mounted &&
        modalState &&
        createPortal(
          <UserModal
            modalRef={modalRef}
            id={id}
            name={name}
            position={cursorPosition!}
            isOnline={isOnline}
            closeModal={closeModal}
          />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default FriendItem;
