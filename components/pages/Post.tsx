import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./Post.module.scss";

const Post = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["post", { id: router.query.postId }],
    queryFn: () => axios.get(`/api/discussions/get/${router.query.postId}`),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return (
    <section className={styles.post}>
      {!isLoading && data?.data.post.length > 0 && (
        <div className={styles.header}>
          <h1>{data?.data.post[0].subject}</h1>
          <p>{data?.data.post[0].description}</p>
        </div>
      )}
    </section>
  );
};

export default Post;
