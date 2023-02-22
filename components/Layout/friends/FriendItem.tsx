import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { createPortal } from "react-dom";

import useModal from "@/hooks/useModal";

import styles from "./FriendItem.module.scss";

import UserModal from "@/components/modals/UserModal";

interface friendProps {
  id: string;
  name: string;
  isOnline: boolean;
  state: boolean;
}

const FriendItem: React.FC<friendProps> = ({ id, name, isOnline, state }) => {
  const { modalRef, modalState, showModal } = useModal();

  const [mounted, setMounted] = useState<boolean>(false);

  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>();

  const showModalHandler = (event: React.MouseEvent) => {
    let positionX = 230;
    let positionY = event.clientY;

    if (positionY + 180 > window.innerHeight) {
      positionY = window.innerHeight - 200;
    }

    const cursorPosition = {
      x: positionX,
      y: positionY,
    };

    showModal();
    setCursorPosition(cursorPosition);
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
          />,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default FriendItem;
