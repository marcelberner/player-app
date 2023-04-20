import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import LoginSection from "@/components/pages/Login";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - PalyerApp</title>
        <meta
          name="description"
          content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
        />
      </Head>
      <LoginSection />;
    </>
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

export default Login;
