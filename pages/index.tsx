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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <FrontCard />
        <MovieSection title="Najpopularniejsze"/>
        <MovieSection title="Filmy akcji"/>
        <MovieSection title="Horrory"/>
        <MovieSection title="Wojenne"/>
        <MovieSection title="Komedie"/>
        <MovieSection title="Dreszczowce"/>
      </Layout>
    </>
  );
}

export default Home;
