import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const value = req.query.value;

  try {
    const movies_by_value = await client.query(`SELECT title FROM movies 
    WHERE LOWER(title) LIKE LOWER('%${value}%')
    limit 8`);

    res.status(200).json({ results: movies_by_value });
  } catch {
    res.status(500).json({ message: "Couldn't get movies by value." });
  }
};

export default Handler;
