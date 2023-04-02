import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./../../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  let discussions;

  try {
    discussions = await client.query(`
    SELECT discussions.id, subject, description, create_date, username  
    FROM discussions 
    JOIN users ON users.email = discussions.creator`);
  } catch {
    res.status(500).json({ message: "Could not get discussions." });
    return;
  }
  res.status(200).json({ discussions: [...discussions.rows] });
};

export default Handler;
