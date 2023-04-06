import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";

import styles from "./FriendsList.module.scss";

import FriendItem from "./FriendItem";
import Button from "@/components/Buttons/Button";

interface friendsProps {
  state: boolean;
}

const FriendsList: React.FC<friendsProps> = ({ state }) => {
  const email = useAppSelector((state) => state.userData.email);
  const sidebarState = useAppSelector((state) => state.sidebarData.isHidden);

  const { data, isLoading } = useQuery({
    queryKey: "friends",
    queryFn: () => axios.get("/api/friends/get"),
    refetchOnWindowFocus: false,
  });

  // const filteredList = FRIENDS_LIST.sort(
  //   (a, b) => (b.isOnline as any) - (a.isOnline as any)
  // );

  return (
    <div className={styles.friendslist}>
      <h3 className={styles.label}>FRIENDS</h3>
      {data?.data.users.length > 0 ? (
        <ul className={styles.list}>
          {data?.data.users.map((friend: any) => (
            <FriendItem
              key={friend.id}
              id={friend.id}
              name={friend.username}
              isOnline={true}
              state={state}
            />
          ))}
        </ul>
      ) : (
        <div
          className={`${styles.not_found} ${!sidebarState ? styles.hide : ""}`}
        >
          <h4>Your friend list is empty</h4>
          <Link href={"/community/members"}>
            <Button>Find friends</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FriendsList;
