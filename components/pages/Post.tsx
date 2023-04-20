import React, { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

import Icon from "../UI/Icon";
import Button from "../Buttons/Button";
import NavLabel from "../Labels/NavLabel";
import PageLoader from "../UI/PageLoader";

import styles from "./Post.module.scss";

const Post = () => {
  const router = useRouter();
  const commentRef = useRef<HTMLInputElement>();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["post", { id: router.query.postId }],
    queryFn: () => axios.get(`/api/discussions/get/${router.query.postId}`),
    refetchOnWindowFocus: false,
  });

  const sendComment = (data: { content: string }) => {
    return axios.post(`/api/discussions/comment/${router.query.postId}`, {
      comment: data.content,
    });
  };

  const commentMutation = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["post", { id: router.query.postId }]);
    },
  });

  const shareCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();

    commentMutation.mutate({
      content: commentRef.current!.value,
    });

    commentRef.current!.value = "";
  };

  if (isLoading) return <PageLoader />;

  return (
    <section className={styles.post}>
      <NavLabel>
        <Icon icon="communityFill" />
      </NavLabel>
      <div className={styles.post_content}>
        {data?.data.post.length > 0 && (
          <>
            <div className={styles.header}>
              <span className={styles.post_date}>
                {data?.data.post[0].create_date
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join(".")}
              </span>
              <h1>{data?.data.post[0].subject}</h1>
              <p>{data?.data.post[0].description}</p>
              <div className={styles.author_bar}>
                <span>Created by</span>
                <Icon icon="userAvatar" />
                <span>{data?.data.post[0].username}</span>
              </div>
            </div>
            <div className={styles.comments}>
              {data?.data.post[0].comment_description ? (
                <>
                  <h2>Comments :</h2>
                  <ul className={styles.comments_list}>
                    {data?.data.post.map((comment: any, index: number) => {
                      if (comment.comment_description)
                        return (
                          <li key={index}>
                            <span>
                              {comment.comment_date
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join(".")}
                            </span>
                            <span>{comment.comment_creator}</span>
                            <p>{comment.comment_description}</p>
                          </li>
                        );
                    })}
                  </ul>
                </>
              ) : (
                <h2 className={styles.not_found}>No comments yet</h2>
              )}
              <form
                onSubmit={shareCommentHandler}
                className={styles.comment_form}
              >
                <Icon icon="userAvatar" />
                <input
                  ref={commentRef as any}
                  type="text"
                  placeholder="Write your comment..."
                />
                <Button>
                  <Icon icon="paperPlane" />
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Post;
