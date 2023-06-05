import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  let messages;

  const friendEmail = req.query.friendEmail;
  const email = session.user?.email;

  try {
    messages = await client.query(`
    SELECT * FROM messages 
    WHERE (message_from = '${email}') AND (message_to = '${friendEmail}')
    OR (message_from = '${friendEmail}') AND (message_to = '${email}')
    ORDER BY create_date
    `);
  } catch {
    res.status(500).json({ message: "Couldn't get messages." });
  }
  res.status(200).json({ messages: messages?.rows });
};

export default Handler;
