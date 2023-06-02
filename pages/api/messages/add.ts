import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  console.log(session)

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const { friendEmail, message } = req.body;
  const email = session.user?.email;

  try {
    await client.query(`
      INSERT INTO messages 
      (
        message_from,
        message_to,
        message_content,
        create_date
      ) 
      VALUES 
      (
        '${email}',
        '${friendEmail}',
        '${message}',
        to_timestamp(${Date.now()} / 1000.0)
      )
    `);
  } catch {
    res.status(500).json({ message: "Couldn't get messages." });
  }
  res.status(200).json({ message: "Massage sent." });
};

export default Handler;
