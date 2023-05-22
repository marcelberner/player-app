import React from "react";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

import usePageKick from "@/hooks/kick";

import SearchComponent from "@/components/pages/Search";
import Head from "next/head";

const Search = () => {
  const router = useRouter();
  const status = usePageKick();

  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>{router.query.query} - PalyerApp</title>
          <meta
            name="description"
            content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
          />
        </Head>
        <Layout>
          <SearchComponent />
        </Layout>
      </>
    );
  }
};

export default Search;
