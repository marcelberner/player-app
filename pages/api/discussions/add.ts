import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../lib/database";
import { getSession } from "next-auth/react";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" });
    return;
  }

  const { subject, description } = req.body;

  if (
    !subject ||
    !description ||
    subject.length == 0 ||
    description.length == 0
  ) {
    res.status(400).json({ message: "Fill empty fields" });
  }

  const email = session.user?.email;

  try {
    const res = await client.query(`INSERT INTO discussions 
    (
      creator,
      subject,
      description,
      create_date
    ) 
      VALUES 
    (
      '${email}',
      '${subject}',
      '${description}',
      to_timestamp(${Date.now()} / 1000.0)
    )`);
  } catch {
    res.status(500).json({ message: "Could not create discussion." });
    return;
  }
  res.status(200).json({ message: "Discussion create successful." });
};

export default Handler;
