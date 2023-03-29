import React from "react";

import useModal from "@/hooks/useModal";

import NotificationModal from "@/components/modals/NotificationModal";
import LogoutModal from "@/components/modals/LogoutModal";
import IconButton from "@/components/Buttons/IconButton";

import styles from "./UserButton.module.scss";

interface buttonProps {
  icon: JSX.Element;
  id?: string;
  allert?: boolean;
  modal: {
    header: string;
    emptyText: string;
  };
}

const UserButton: React.FC<buttonProps> = ({ icon, id, modal, allert }) => {
  const { modalRef, modalState, showModal } = useModal();

  return (
    <div
      className={`${styles.container} ${allert ? styles.marked : ""} ${
        id == "user-avatar" ? styles.avatar : ""
      }`}
    >
      <IconButton id={id} action={showModal}>
        {icon}
      </IconButton>
      {modalState &&
        (id == "user-avatar" ? (
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
