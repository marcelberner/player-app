import Head from "next/head";
import { createPortal } from "react-dom";

import { useAppSelector } from "@/hooks/redux";

import Layout from "@/components/Layout/Layout";
import MessageModal from "@/components/modals/MessageModal";

import FrontCard from "@/components/Cards/FrontCard";
import MovieSection from "@/components/Sections/MovieSection";

function Home() {
  const isMessageVisible = useAppSelector((state) => state.messageData.toUser);

  return (
    <>
      <Head>
        <title>Home | PalyerApp</title>
        <meta
          name="description"
          content="Oglądaj swoje ulubione filmy i seriale na PlayerApp gdzie tylko chcesz. Pobieraj odkrywaj i dołącz do naszej społeczności. Codziennie nocne wspólne seanse."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <FrontCard />
        <MovieSection genre="Comedy"/>
        <MovieSection genre="Action" />
        <MovieSection genre="Thriller" />
        <MovieSection genre="Horror" />
        <MovieSection genre="Animation" />
        <MovieSection genre="Fantasy" />
      </Layout>
      {isMessageVisible &&
        createPortal(<MessageModal />, document.getElementById("modal")!)}
    </>
  );
}

export default Home;
