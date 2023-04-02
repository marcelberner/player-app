import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import PostComponent from "@/components/pages/Post";
import Layout from "@/components/Layout/Layout";

const Post = () => {
  return (
    <Layout>
      <PostComponent />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session)
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

export default Post;
