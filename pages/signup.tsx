import React from "react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

import Head from "next/head"
import LoginSection from "@/components/pages/Login"

const Login = () => {
  return (
    <>
      <Head>
        <title>Signup - PalyerApp</title>
        <meta
          name="description"
          content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
        />
      </Head>
      <LoginSection signup />;
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req })

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }

  return {
    props: {
      session: session,
    },
  }
}

export default Login
