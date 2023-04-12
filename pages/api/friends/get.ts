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

  let friends;

  try {
    friends = await client.query(`
    SELECT users.id, request_from, request_to, username FROM friends 

    JOIN users ON users.email = friends.request_from 
    AND users.email != '${email}' 
    OR users.email = friends.request_to 
    AND users.email != '${email}'

    WHERE status = 'accepted' AND
    (request_from = '${email}' OR request_to = '${email}')  
    `);
  } catch {
    res.status(500).json({ message: "Could not add friend." });
  }

  res.status(200).json({ users: friends?.rows });
};

export default Handler;
