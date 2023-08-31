import React from "react"

import usePageKick from "@/hooks/kick"

import PostComponent from "@/components/pages/Post"
import Layout from "@/components/Layout/Layout"
import Head from "next/head"

const Post = () => {
  const status = usePageKick()

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Posts - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <PostComponent />
        </Layout>
      </>
    )
  }
}

export default Post
