import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/database";
import { getSession } from "next-auth/react";

const LIMIT = 15;

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const email = session.user?.email;

  const page = parseInt(req.query.page as any);
  const username = req.query.username as any;

  let users: any;

  try {
    users = await client.query(`
    SELECT username, email, is_requested.status as is_requested
    FROM users 

    LEFT JOIN (
    SELECT id, request_from, request_to, status
    FROM friends
    WHERE (friends.status = 'accepted' OR friends.status = 'pending') 
    AND (request_from = '${email}' OR request_to = '${email}')  
    ) AS is_requested
    ON (users.email = is_requested.request_from AND users.email != '${email}') 
    OR (users.email = is_requested.request_to AND users.email != '${email}')

    WHERE ((users.email != '${email}') 
    AND (${!!username ? `LOWER(username) LIKE LOWER('%${username}%')` : "1=1"}))
    LIMIT ${LIMIT + 1}
    OFFSET ${(page - 1) * LIMIT}
    `);
  } catch {
    res.status(500).json({ message: "Couldn't get users." });
  }

  const rows = users.rows.slice(0, LIMIT);
  const hasNextPage = users.rows.length > LIMIT;

  res.status(200).json({
    users: rows,
    next: hasNextPage ? page + 1 : undefined,
    prev: page > 1 ? page - 1 : undefined,
  });
};

export default Handler;
