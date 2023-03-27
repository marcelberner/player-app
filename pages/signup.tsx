import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import LoginSection from "@/components/pages/Login";

const Login = () => {
  return <LoginSection signup />;
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
