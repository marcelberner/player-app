import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { client } from "./../lib/database";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

import Layout from "@/components/Layout/Layout";

import FrontCard from "@/components/Cards/FrontCard";
import MovieSection from "@/components/Sections/MovieSection";

function Home({ movies }: any) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") router.replace("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status == "authenticated")
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
              key={movie.genre}
              genre={movie.genre}
              movies={movie.movies}
            />
          ))}
        </Layout>
      </>
    );
}

export const getStaticProps: GetServerSideProps = async () => {
  const comedy = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Comedy'
  limit 40
  `);

  const animations = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Animation'
  limit 40
  `);

  const fantasy = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Fantasy'
  limit 40
  `);

  const war = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'War'
  limit 40
  `);

  const horror = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Horror'
  limit 40
  `);

  const thriller = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Thriller'
  limit 40
  `);

  const romance = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Romance'
  limit 40
  `);

  const documentary = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Documentary'
  limit 40
  `);

  const science_fiction = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'Science Fiction'
  limit 40
  `);

  const history = await client.query(`
  SELECT * FROM movies 
  JOIN movie_genre ON movies.id = movie_genre.movie_id 
  JOIN genres ON movie_genre.genre_id = genres.id 
  WHERE genres.genre = 'History'
  limit 40
  `);

  const movies = [
    {
      genre: "Comedy",
      movies: comedy.rows,
    },
    {
      genre: "Documentary",
      movies: documentary.rows,
    },
    {
      genre: "Horror",
      movies: horror.rows,
    },
    {
      genre: "Animations",
      movies: animations.rows,
    },
    {
      genre: "Romance",
      movies: romance.rows,
    },
    {
      genre: "Fantasy",
      movies: fantasy.rows,
    },
    {
      genre: "War",
      movies: war.rows,
    },
    {
      genre: "Thriller",
      movies: thriller.rows,
    },
    {
      genre: "Science Fiction",
      movies: science_fiction.rows,
    },
    {
      genre: "History",
      movies: history.rows,
    },
  ];

  return {
    props: {
      movies: movies,
    },
  };
};

export default Home;
