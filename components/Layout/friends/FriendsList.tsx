import React from "react";

import styles from "./FriendsList.module.scss";

import FriendItem from "./FriendItem";

interface friendsProps {
  state: boolean;
}

const FRIENDS_LIST = [
  {
    id: "1",
    name: "Mariusz4235",
    isOnline: false,
  },
  {
    id: "2",
    name: "Janusz21",
    isOnline: true,
  },
  {
    id: "3",
    name: "Mariola41",
    isOnline: true,
  },
  {
    id: "4",
    name: "Jaro68",
    isOnline: false,
  },
  {
    id: "5",
    name: "Bożydar000",
    isOnline: false,
  },
  {
    id: "6",
    name: "Kamil39",
    isOnline: true,
  },
  {
    id: "1",
    name: "Mariusz4235",
    isOnline: false,
  },
  {
    id: "2",
    name: "Janusz21",
    isOnline: true,
  },
  {
    id: "3",
    name: "Mariola41",
    isOnline: true,
  },
  {
    id: "4",
    name: "Jaro68",
    isOnline: false,
  },
  {
    id: "5",
    name: "Bożydar000",
    isOnline: false,
  },
  {
    id: "6",
    name: "Kamil39",
    isOnline: true,
  },
]; 

const FriendsList: React.FC<friendsProps> = ({ state }) => {
  const filteredList = FRIENDS_LIST.sort((a, b) => (b.isOnline as any) - (a.isOnline as any));

  return (
    <div className={styles.friendslist}>
      <h3 className={styles.label}>FRIENDS</h3>
      <ul className={styles.list}>
        {filteredList.map((friend, index) => (
          <FriendItem
            key={index}
            id={friend.id}
            name={friend.name}
            isOnline={friend.isOnline}
            state={state}
          />
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
