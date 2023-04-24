import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./../../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });


  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const postId = req.query.postId;
  const comment = req.body.comment;
  const email = session.user?.email;

  if (!comment || comment.length == 0) {
    return;
  }

  try {
    const res = await client.query(` 
    INSERT INTO discussions_comments (
      discussion,
      creator ,
      description ,
      create_date 
    ) VALUES (
      '${postId}',
      '${email}',
      '${comment}',
      to_timestamp(${Date.now()} / 1000.0)
    )
    `);
  } catch {
    res.status(500).json({ message: "Could not create comment." });
    return;
  }
  res.status(200).json({ message: "Comment create successful." });
};

export default Handler;
