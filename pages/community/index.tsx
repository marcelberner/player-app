import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "@/components/Layout/Layout";
import CommunityComponent from "@/components/pages/Community";

const Community = () => {
  return (
    <Layout>
      <CommunityComponent />
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
