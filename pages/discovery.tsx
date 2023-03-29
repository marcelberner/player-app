import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "@/components/Layout/Layout";

import DiscoveryComponent from "@/components/pages/Discovery";

const Discovery = () => {
  return (
    <>
      <Layout>
        <DiscoveryComponent />
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

export default Discovery;
