import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../lib/database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword, genres, year } = req.query;

  let movies;

  try {
    movies = await client.query(`
    SELECT DISTINCT * from movies
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
      AND (${!!genres ? `genres.genre IN (${(genres as [])!.join(",")})` : "1=1"})
      AND (${
        !!year
          ? `year BETWEEN ${(year as any).start} AND ${(year as any).end}`
          : "1=1"
      })
    ) 
    limit 30
    `);

    console.log(movies);
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." });
  }
  res.status(200).json({ movies: movies?.rows });
};

export default Handler;
