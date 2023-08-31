import React from "react"

import usePageKick from "@/hooks/kick"

import Layout from "@/components/Layout/Layout"
import Cinema from "@/components/pages/Cinema"
import Head from "next/head"

const LiveCinema = () => {
  const status = usePageKick()

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Cinema - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <Cinema />
        </Layout>
      </>
    )
  }
}

export default LiveCinema
