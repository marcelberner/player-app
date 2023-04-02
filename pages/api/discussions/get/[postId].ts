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

  let post;

  try {
    post = await client.query(`
    SELECT 
    
    post.subject, 
    post.description, 
    post.create_date, 
    post.username, 
    comments.username as comment_creator,
    comments.description as comment_description,
    comments.create_date as comment_date
    
    FROM
    (
      SELECT discussions.id, subject, users.username, description, create_date FROM discussions 
      JOIN users ON creator = users.email
      WHERE discussions.id = '${postId}'
      ) 
      AS post
      
    LEFT JOIN 
      (
    SELECT users.username, discussion, description, create_date FROM discussions_comments
    JOIN users ON discussions_comments.creator = users.email
    ) 
    AS comments
    ON comments.discussion = post.id
    `);
  } catch {
    res.status(500).json({ message: "Could not get discussions." });
    return;
  }

  if (post.rows.length == 0)
    res.status(400).json({ message: "Could not find post." });

  res.status(200).json({ post: [...post.rows] });
};

export default Handler;
