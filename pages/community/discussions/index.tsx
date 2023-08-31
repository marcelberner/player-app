import React from "react"
import Layout from "@/components/Layout/Layout"

import usePageKick from "@/hooks/kick"

import DiscussionsComponent from "@/components/pages/Discussions"
import Head from "next/head"

const Discuss = () => {
  const status = usePageKick()

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Discussions - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <DiscussionsComponent />
        </Layout>
      </>
    )
  }
}

export default Discuss
