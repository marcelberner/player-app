import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./../../../lib/database";
import { getSession } from "next-auth/react";

const LIMIT = 10;

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const email = session.user?.email;

  const { movieId } = req.query;
  const page = parseInt(req.query.page as any);

  let opinions: any;

  try {
    opinions = await client.query(`
    SELECT (email = '${email}') AS is_me,  username, description, create_date, rating FROM opinions 
    JOIN users ON users.email = opinions.creator 

    WHERE movie_id = '${movieId}'

    ORDER BY create_date DESC
    LIMIT ${LIMIT + 1}
    OFFSET ${(page - 1) * LIMIT}
    `);
  } catch {
    res.status(500).json({ message: "Could not get opinions." });
  }

  const rows = opinions.rows.slice(0, LIMIT);
  const hasNextPage = opinions.rows.length > LIMIT;

  res.status(200).json({
    opinions: rows,
    next: hasNextPage ? page + 1 : undefined,
    prev: page > 1 ? page - 1 : undefined,
  });
};

export default Handler;
