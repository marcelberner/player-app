import React from "react";
import Layout from "@/components/Layout/Layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import SearchComponent from "@/components/pages/Search";

const Search = () => {
  return (
    <Layout>
      <SearchComponent />
    </Layout>
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
