import React from "react";

import useModal from "@/hooks/useModal";

import NotificationModal from "@/components/modals/NotificationModal";
import LogoutModal from "@/components/modals/LogoutModal";

import styles from "./UserButton.module.scss";

interface buttonProps {
  icon: JSX.Element;
  isMarked: boolean;
  user: boolean;
  modal: {
    header: string;
    emptyText: string;
  };
}

const UserButton: React.FC<buttonProps> = ({ icon, isMarked, user, modal }) => {
  const { modalRef, modalState, showModal } = useModal();

  return (
    <div className={styles.container}>
      <button
        onClick={showModal}
        className={`${styles.button} ${isMarked ? styles.marked : ""} ${
          user ? styles.user : ""
        }`}
      >
        {icon}
      </button>
      {modalState &&
        (user ? (
          <LogoutModal modalRef={modalRef} />
        ) : (
          <NotificationModal
            modalRef={modalRef}
            header={modal.header}
            emptyText={modal.emptyText}
          />
        ))}
    </div>
  );
};

export default UserButton;
