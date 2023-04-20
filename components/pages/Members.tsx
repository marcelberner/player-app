import React, { useRef } from "react";
import axios from "axios";
import { useInfiniteQuery, useQueryClient } from "react-query";

import NavLabel from "../Labels/NavLabel";
import Icon from "../UI/Icon";
import PinnedButton from "../Buttons/PinnedButton";
import Button from "../Buttons/Button";
import PageLoader from "../UI/PageLoader";

import styles from "./Members.module.scss";

const Members = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const addFriendHandler = async (userEmail: string) => {
    const res = await axios.post("/api/friends/request", {
      requestToEmail: userEmail,
    });

    queryClient.invalidateQueries(["members"]);
  };

  const { data, hasNextPage, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: "members",
    getNextPageParam: (prevData: any) => prevData.data.next,
    queryFn: ({ pageParam = 1 }) => {
      const username = inputRef.current!.value;

      return axios.get(`/api/search/users`, {
        params: { page: pageParam, username: username },
      });
    },
    refetchOnWindowFocus: false,
  });

  return (
    <section className={styles.members}>
      <div className={styles.header}>
        <NavLabel>
          <Icon icon="communityFill" />
        </NavLabel>
        <input
          ref={inputRef}
          type="text"
          onChange={() => queryClient.invalidateQueries(["members"])}
          placeholder="Search user..."
        />
      </div>
      {isLoading ? (
        <PageLoader />
      ) : data!.pages.flatMap((data: any) => data.data.users).length > 0 ? (
        <ul className={styles.users_list}>
          {data?.pages
            .flatMap((data: any) => data.data.users)
            .map((user, index) => (
              <li key={index} className={styles.user_item}>
                <Icon icon="userAvatar" />
                <span className={styles.username}>{user.username}</span>
                <span className={styles.email}>{user.email}</span>
                <div
                  className={`${styles.status_box} ${
                    user.is_requested == "accepted" ? styles.accepted : ""
                  }`}
                >
                  {!user.is_requested ? (
                    <PinnedButton action={() => addFriendHandler(user.email)}>
                      <Icon icon="friendAdd" />
                    </PinnedButton>
                  ) : user.is_requested == "pending" ? (
                    <Icon icon="sendStatus" />
                  ) : (
                    <Icon icon="friendChecked" />
                  )}
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <h2>No users found</h2>
      )}
      {hasNextPage && <Button action={() => fetchNextPage()}>Show more</Button>}
    </section>
  );
};

export default Members;
