import React from "react";

import usePageKick from "@/hooks/kick";

import Layout from "@/components/Layout/Layout";
import MembersComponent from "@/components/pages/Members";
import Head from "next/head";

const Members = () => {
  const status = usePageKick();

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Members - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <MembersComponent />
        </Layout>
      </>
    );
  }
};

export default Members;
