import React from "react";
import Layout from "@/components/Layout/Layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import SearchComponent from "@/components/pages/Search";
import Head from "next/head";

const Search = () => {
  const router = useRouter();

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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      session: session,
    },
  };
};

export default Search;
