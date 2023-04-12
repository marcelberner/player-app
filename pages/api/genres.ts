import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/database";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {

  let genres;
  
  try {
    genres = await client.query(`SELECT id, genre FROM genres `);
  } catch {
    res.status(500).json({ message: "Couldn't get genres." });
  }
  res.status(200).json({ genres: genres?.rows });
};

export default Handler;
