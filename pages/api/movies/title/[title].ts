import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/database";

const LIMIT = 15;

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const title = req.query.title;
  const page = parseInt(req.query.page as any);

  let movies_by_title: any;

  try {
    movies_by_title = await client.query(`
    SELECT * FROM movies 
    WHERE LOWER(title) LIKE LOWER('%${title}%')
    LIMIT ${LIMIT + 1}
    OFFSET ${(page - 1) * LIMIT}
    `);
  } catch {
    res.status(500).json({ message: "Couldn't get movies by value." });
  }

  const rows = movies_by_title.rows.slice(0, LIMIT);
  const hasNextPage = movies_by_title.rows.length > LIMIT;

  res.status(200).json({
    movies: rows,
    next: hasNextPage ? page + 1 : undefined,
    prev: page > 1 ? page - 1 : undefined,
  });
};

export default Handler;
