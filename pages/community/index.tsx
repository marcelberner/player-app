import React from "react";

import usePageKick from "@/hooks/kick";

import Layout from "@/components/Layout/Layout";
import CommunityComponent from "@/components/pages/Community";
import Head from "next/head";

const Community = () => {
  const status = usePageKick();

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Community - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <CommunityComponent />
        </Layout>
      </>
    );
  }
};

export default Community;
