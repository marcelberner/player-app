import { NextApiRequest, NextApiResponse } from "next"
import { client } from "./../../../../lib/database"
import { getSession } from "next-auth/react"

const LIMIT = 12

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" })
    return
  }

  const page = parseInt(req.query.page as any)

  let discussions

  try {
    discussions = await client.query(`
    SELECT

    discussions.id,
    subject, 
    discussions.description, 
    discussions.create_date, 
    users.username,
    num_comments

    FROM 
    discussions

    LEFT JOIN (
        SELECT discussion, COUNT(*) as num_comments
        FROM discussions_comments
        GROUP BY discussion
    ) as comment_counts ON discussions.id = comment_counts.discussion

    JOIN users ON users.email = discussions.creator
    ORDER BY discussions.create_date DESC
    LIMIT ${LIMIT + 1}
    OFFSET ${(page - 1) * LIMIT}
    `)
  } catch {
    res.status(500).json({ message: "Could not get discussions." })
    return
  }

  const rows = [...discussions.rows].slice(0, LIMIT)
  const hasNextPage = discussions.rows.length > LIMIT

  res.status(200).json({
    discussions: rows,
    next: hasNextPage ? page + 1 : undefined,
    prev: page > 1 ? page - 1 : undefined,
  })
}

export default Handler
