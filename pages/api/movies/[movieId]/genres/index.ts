import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const movieID = req.query.movieId;
  client.connect();

  try {
    const genreList = await client.query(`SELECT * from genres
    join movie_genre on movie_genre.genre_id = genres.id 
    where movie_genre.movie_id = '${movieID}';`);
    res.status(200).json({ genres: genreList });
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." });
  }
};

export default Handler;
