import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import NavLabel from "../Labels/NavLabel";
import Icon from "../UI/Icon";
import PinnedButton from "../Buttons/PinnedButton";

import styles from "./Members.module.scss";

const Members = () => {
  const [username, setusername] = useState<string>("");
  const [users, setusers] = useState<
    { email: string; username: string }[] | null
  >(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const addFriendHandler = (userEmail: string) => {
    const res = axios.post("/api/friends/request", {
      requestToEmail: userEmail,
    });
  };

  const date = Date;

  console.log(date.now());

  const updateTitleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    setusername(currentValue);
  };

  useEffect(() => {
    axios
      .get(`/api/search/users/${username}`)
      .then((response) => setusers(response.data.users.rows));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <section className={styles.members}>
      <div className={styles.header}>
        <NavLabel>
          <Icon icon="communityFill" />
        </NavLabel>
        <input
          ref={inputRef}
          type="text"
          onChange={updateTitleHandler}
          placeholder="Search user..."
        />
      </div>
      {users ? (
        users.length > 0 ? (
          <ul className={styles.users_list}>
            {users.map((user, index) => (
              <li key={index} className={styles.user_item}>
                <Icon icon="userAvatar" />
                <span className={styles.username}>{user.username}</span>
                <span className={styles.email}>{user.email}</span>
                <PinnedButton action={() => addFriendHandler(user.email)}>
                  <Icon icon="friendAdd" />
                </PinnedButton>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No users found</h2>
        )
      ) : (
        <h2>Search users</h2>
      )}
    </section>
  );
};

export default Members;
