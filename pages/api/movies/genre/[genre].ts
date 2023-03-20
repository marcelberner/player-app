import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const genre = req.query.genre;
  // client.connect();

  try {
    const movies_by_genre = await client.query(`SELECT * from movies 
    join movie_genre on movies.id = movie_genre.movie_id 
    join genres on movie_genre.genre_id = genres.id 
    where genres.genre = '${genre}'
    limit 30`);

    res.status(200).json({ movies: movies_by_genre });
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." });
  }
};

export default Handler;
