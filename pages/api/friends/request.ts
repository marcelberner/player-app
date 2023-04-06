import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const requestToEmail = req.body.requestToEmail;
  const email = session.user?.email;

  let isRequest;

  try {
    isRequest = await client.query(`
    SELECT * FROM friends
    WHERE request_from in ('${requestToEmail}', '${email}')
    AND request_to in ('${requestToEmail}', '${email}')
    AND status in ('pending', 'accepted')
    `);
  } catch {
    res.status(500).json({ message: "Could not add friend." });
    return;
  }

  if (!isRequest || isRequest.rows.length != 0) {
    res.status(401).json({ message: "Friend requesi is already sended." });
    return;
  }

  try {
    const res = await client.query(`
    INSERT INTO friends (
    request_from,
    request_to,
    status,
    request_date
    ) VALUES (
    '${email}',
    '${requestToEmail}',
    'pending',
    to_timestamp(${Date.now()} / 1000.0)
    )
    `);
  } catch {
    res.status(500).json({ message: "Could not add friend." });
  }
  res.status(200).json({ message: "Request sended." });
};

export default Handler;
