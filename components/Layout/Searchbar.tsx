import React, { useState, useEffect, useRef } from "react";
import styles from "./Searchbar.module.scss";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

import Icon from "../UI/Icon";
import IconButton from "@/components/Buttons/IconButton";

interface searchbarProps {
  searchbarState: boolean;
  toggleSearchbar: () => void;
}

const Searchbar: React.FC<searchbarProps> = ({
  searchbarState,
  toggleSearchbar,
}) => {
  const [title, setTitle] = useState<string>("");
  const [results, setResults] = useState<{ title: string }[] | null>(null);
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const searchTitleHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length == 0) return;

    router.push(`/search/${title}`);
    setResults(null);
  };

  const updateTitleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;

    setTitle(currentValue);
  };

  const clearResultsHandler = (e: React.MouseEvent) => {
    if (!formRef.current!.contains(e.target as any)) {
      setResults(null);
      removeEventListener("click", clearResultsHandler as any);
    }
  };

  const disappearHandler = (e: React.MouseEvent) => {
    if (!formRef.current!.contains(e.target as any)) {
      toggleSearchbar();
      removeEventListener("click", disappearHandler as any);
    }
  };

  useEffect(() => {
    if (!searchbarState) return;
    addEventListener("click", disappearHandler as any);

    return () => removeEventListener("click", disappearHandler as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchbarState]);

  useEffect(() => {
    if (title.length == 0) {
      setResults(null);
      return;
    }

    addEventListener("click", clearResultsHandler as any);

    axios
      .get(`/api/search/movies/${title}`)
      .then((response) => setResults(response.data.results.rows));

    return () => removeEventListener("click", clearResultsHandler as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <form
      ref={formRef}
      onSubmit={searchTitleHandler}
      className={`${styles.search_form} ${
        searchbarState ? styles.visible : ""
      }`}
    >
      <input
        type={"search"}
        onChange={updateTitleHandler}
        className={styles.searchbar}
        placeholder="Search title..."
      />
      <button type="submit" className={styles.search_button}>
        <Icon icon="searchLoupe" />
      </button>
      {results && results.length > 0 && (
        <ul className={styles.search_results}>
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => router.push(`/search/${result.title}`)}
            >
              <Icon icon="searchLoupe" />
              <span>{result.title}</span>
            </li>
          ))}
        </ul>
      )}
      <IconButton action={toggleSearchbar}>
        <Icon icon="searchLoupe" />
      </IconButton>
    </form>
  );
};

export default Searchbar;
