import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const title = req.query.title;

  try {
    const movies_by_title = await client.query(`SELECT * FROM movies 
    WHERE LOWER(title) LIKE LOWER('%${title}%')
    LIMIT 35`);

    res.status(200).json({ movies: movies_by_title });
  } catch {
    res.status(500).json({ message: "Couldn't get movies by value." });
  }
};

export default Handler;
