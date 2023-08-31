import { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../../lib/database"
import { getSession } from "next-auth/react"

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" })
    return
  }

  const title = req.query.title

  try {
    const movies_by_title = await client.query(`SELECT title FROM movies 
    WHERE LOWER(title) LIKE LOWER('%${title}%')
    limit 8`)

    res.status(200).json({ results: movies_by_title })
  } catch {
    res.status(500).json({ message: "Couldn't get movies by title." })
  }
}

export default Handler
