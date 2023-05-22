import React from "react";

import Layout from "@/components/Layout/Layout";
import Head from "next/head";

import usePageKick from "@/hooks/kick";

import DiscoveryComponent from "@/components/pages/Discovery";

const Discovery = () => {
  const status = usePageKick();

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Discovery - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <DiscoveryComponent />
        </Layout>
      </>
    );
  }
};

export default Discovery;
