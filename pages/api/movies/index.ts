import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../lib/database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword, genres, yearStart, yearEnd } = req.query;

  let movies;
  let genreString;

  if (!!genres) {
    if (typeof genres === "string") genreString = genres;
    else genreString = (genres as string[]).join(", ");
  }

  try {
    movies = await client.query(`
    SELECT DISTINCT ON (movie_id) * from movies
    JOIN movie_genre ON movies.id = movie_genre.movie_id 
    JOIN genres on movie_genre.genre_id = genres.id
    WHERE 
    ( 
      (${
        !!keyword
          ? `
      LOWER(title) LIKE LOWER('%${keyword}%') 
      OR LOWER(description) LIKE LOWER('%${keyword}%')`
          : "1=1"
      })
      AND (${!!genres ? `genres.genre IN (${genreString})` : "1=1"})
      AND (${!!yearStart ? `year >= ${yearStart}` : "1=1"})
      AND (${!!yearEnd ? `year <= ${yearEnd}` : "1=1"})
    ) 
    limit 30
    `);
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." });
  }
  res.status(200).json({ movies: movies?.rows });
};

export default Handler;
