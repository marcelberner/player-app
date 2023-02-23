import React from "react";

import styles from "./NotificationModal.module.scss";

interface modalProps {
  header: string;
  emptyText: string;
  modalRef: any;
  items?: {
    title: string;
    content: string;
  };
}

const NotificationModal: React.FC<modalProps> = ({
  header,
  items,
  emptyText,
  modalRef,
}) => {
  return (
    <div ref={modalRef} className={styles.modal}>
      <h3 className={styles.header}>{header}</h3>
      <ul className={styles.list}>
        {<span className={styles.empty_text}>{emptyText}</span>}
      </ul>
    </div>
  );
};

export default NotificationModal;
