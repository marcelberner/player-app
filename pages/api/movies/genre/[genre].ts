import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const genre = req.query.genre;

  let movies;
  try {
    movies = await client.query(`
    SELECT * FROM movies 
    JOIN movie_genre ON movies.id = movie_genre.movie_id 
    JOIN genres ON movie_genre.genre_id = genres.id 
    WHERE genres.genre = '${genre}'
    limit 30`);
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." });
  }
  res.status(200).json({ movies: movies });
};

export default Handler;