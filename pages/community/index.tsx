import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "@/components/Layout/Layout";

const Community = () => {
  return (
    <Layout>
      <h1>Community</h1>
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

export default Community;
