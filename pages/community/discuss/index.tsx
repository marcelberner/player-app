import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout/Layout";

import DiscussComponent from "@/components/pages/Discuss";

const Discuss = () => {
  return (
    <Layout>
      <DiscussComponent />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      session: session,
    },
  };
};

export default Discuss;
