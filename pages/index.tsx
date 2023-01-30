import Head from "next/head";

import Layout from "@/components/Layout/Layout";

import FrontCard from "@/components/Cards/FrontCard";

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
      </Layout>
    </>
  );
}

export default Home;
