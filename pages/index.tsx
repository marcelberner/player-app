import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Head from "next/head";

import Layout from "@/components/Layout/Layout";

import FrontCard from "@/components/Cards/FrontCard";
import MovieSection from "@/components/Sections/MovieSection";

function Home() {
  return (
    <>
      <Head>
        <title>Home | PalyerApp</title>
        <meta
          name="description"
          content="Oglądaj swoje ulubione filmy i seriale na PlayerApp gdzie tylko chcesz. Pobieraj odkrywaj i dołącz do naszej społeczności. Codziennie nocne wspólne seanse."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="favicon.ico" /> */}
      </Head>
      <Layout>
        <FrontCard />
        <MovieSection genre="Comedy" />
        <MovieSection genre="Action" />
        <MovieSection genre="Horror" />
        <MovieSection genre="Animation" />
        <MovieSection genre="Fantasy" />
        <MovieSection genre="Thriller" />
        <MovieSection genre="Romance" />
        <MovieSection genre="Science Fiction" />
        <MovieSection genre="Documentary" />
        <MovieSection genre="History" />
        <MovieSection genre="War" />
      </Layout>
    </>
  );
}

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

export default Home;
