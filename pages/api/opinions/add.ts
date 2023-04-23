import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const email = session.user?.email;

  const { movieId, rating, content } = req.body;

  let isExisting;

  try {
    isExisting = await client.query(`
    SELECT id FROM opinions
    WHERE movie_id = '${movieId}' AND creator = '${email}'
    `);
  } catch {
    res.status(500).json({ message: "Could not add opinion." });
  }

  if (isExisting?.rows.length! > 0) {
    try {
      const res = await client.query(`
      UPDATE opinions SET 

      rating = '${rating}',
      description = '${content}',
      create_date = to_timestamp(${Date.now()} / 1000.0)

      WHERE movie_id = '${movieId}' AND creator = '${email}'
      `);
    } catch {
      res.status(500).json({ message: "Could not edit opinion." });
    }

    res.status(200).json({
      message: "Opinion updated successfuly.",
    });

    return;
  }

  try {
    const res = await client.query(`
    INSERT INTO opinions 
    (
    movie_id, 
    creator, 
    description, 
    rating,
    create_date
    ) 
    VALUES 
    (
    '${movieId}', 
    '${email}', 
    '${content}',
    ${rating},
    to_timestamp(${Date.now()} / 1000.0)
    
    )`);
  } catch {
    res.status(500).json({ message: "Could not add opinion." });
  }

  res.status(200).json({
    message: "Opinion shared successfuly.",
  });
};

export default Handler;
