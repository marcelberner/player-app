import React from "react";
import { signOut } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";

import Button from "../Buttons/Button";
import Icon from "../UI/Icon";

import styles from "./LogoutModal.module.scss";

interface modalProps {
  modalRef: any;
}

const LogoutModal: React.FC<modalProps> = ({ modalRef }) => {
  const { data, isLoading } = useQuery({
    queryKey: "userData",
    queryFn: () => axios.get("/api/user/data"),
    refetchOnWindowFocus: false,
  });

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div ref={modalRef} className={`modal ${styles.modal}`}>
      <div className={styles.header}>
        <Icon icon="userAvatar" />
        <span className={styles.username}>
          {data?.data.userData.rows[0].username}
        </span>
        <span className={styles.email}>
          {data?.data.userData.rows[0].email}
        </span>
      </div>
      <div className={styles.buttons}>
        <Button outline action={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
