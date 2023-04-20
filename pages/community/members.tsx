import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "@/components/Layout/Layout";
import MembersComponent from "@/components/pages/Members";
import Head from "next/head";

const Members = () => {
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

export default Members;
