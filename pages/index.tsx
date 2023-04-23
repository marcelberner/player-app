import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { client } from "./../lib/database";

import Head from "next/head";

import Layout from "@/components/Layout/Layout";

import FrontCard from "@/components/Cards/FrontCard";
import MovieSection from "@/components/Sections/MovieSection";

function Home({ movies }: any) {
  console.log(movies);
  return (
    <>
      <Head>
        <title>Home - PalyerApp</title>
        <meta
          name="description"
          content="Watch your favorite movies and series on PlayerApp wherever you want. Download, discover and join our community."
        />
      </Head>
      <Layout>
        <FrontCard />
        {movies.map((movie: any) => (
          <MovieSection
            key={movie.genre_name}
            genre={movie.genre_name}
            movies={movie.movies_data}
          />
        ))}
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const movies = await client.query(`
  WITH m AS (
    SELECT DISTINCT ON (movies.id) movies.id, movies.title, movies.year, movies.rating, movies.poster, movies.description, movies.language, movies.runtime, movies.video, array_agg(genres.genre) AS all_genres
    FROM movies
    JOIN movie_genre ON movies.id = movie_genre.movie_id
    JOIN genres ON movie_genre.genre_id = genres.id
    GROUP BY movies.id
    LIMIT 400
  )
  SELECT genres.genre AS genre_name, (
    SELECT json_agg(
      json_build_object(
        'id', m.id, 
        'title', m.title, 
        'year', m.year, 
        'rating', m.rating, 
        'poster', m.poster, 
        'description', m.description, 
        'language', m.language, 
        'runtime', m.runtime, 
        'video', m.video, 
        'genres', m.all_genres
      )
    )
    FROM m
    JOIN unnest(m.all_genres) AS g(genre) ON g.genre = genres.genre
    GROUP BY genres.genre
  ) AS movies_data
  FROM genres
  WHERE genres.genre IN (
    'Action', 
    'Horror', 
    'Fantasy', 
    'Thriller', 
    'Romance', 
    'Science Fiction', 
    'Documentary', 
    'History', 
    'War', 
    'Comedy'
  )
  GROUP BY genres.genre;
  `);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
      movies: movies.rows,
    },
  };
};

export default Home;
