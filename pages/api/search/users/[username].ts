import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const username = req.query.username;
  const email = session.user?.email;

  let users;

  try {
    users = await client.query(`
    SELECT username, email FROM users 
    WHERE email != '${email}'
    AND LOWER(username) LIKE LOWER('%${username}%') 
    limit 8
    `);
  } catch {
    res.status(500).json({ message: "Couldn't get users by username." });
  }
  res.status(200).json({ users: users });
};

export default Handler;
