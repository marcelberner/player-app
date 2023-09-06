import React, { useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { getDate } from "@/lib/dateConverter"

import Icon from "../UI/Icon"
import Button from "../Buttons/Button"
import NavLabel from "../Labels/NavLabel"
import PageLoader from "../UI/PageLoader"
import Text from "../Inputs/Text"
import ContentInfo from "../Info/ContentInfo"

import styles from "./Post.module.scss"

const Post = () => {
  const router = useRouter()
  const commentRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["post", { id: router.query.postId }],
    queryFn: () => axios.get(`/api/discussions/get/${router.query.postId}`),
    refetchOnWindowFocus: false,
  })

  const sendComment = (data: { content: string }) => {
    return axios.post(`/api/discussions/comment/${router.query.postId}`, {
      comment: data.content,
    })
  }

  const commentMutation = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["post", { id: router.query.postId }])
    },
  })

  const shareCommentHandler = (e: React.FormEvent) => {
    e.preventDefault()

    commentMutation.mutate({
      content: commentRef.current!.value,
    })

    commentRef.current!.value = ""
  }

  if (isLoading) return <PageLoader />

  return (
    <section className={styles.post}>
      <NavLabel>
        <Icon icon="communityFill" />
      </NavLabel>
      <div className={styles.post_content}>
        <div className={styles.header}>
          <span className={styles.post_date}>
            {getDate(data?.data.post[0].create_date)}
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
          <h2>Comments :</h2>
          {data?.data.post[0].comment_description ? (
            <ul className={styles.comments_list}>
              {data?.data.post.map((comment: any, index: number) => (
                <li key={index}>
                  <span>{getDate(comment.comment_date)}</span>
                  <span>{comment.comment_creator}</span>
                  <p>{comment.comment_description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ContentInfo>No comments yet</ContentInfo>
          )}
          <form onSubmit={shareCommentHandler} className={styles.comment_form}>
            <Icon icon="userAvatar" />
            <Text inputRef={commentRef} placeholder="Write your comment..." />
            <Button>
              <Icon icon="paperPlane" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Post
