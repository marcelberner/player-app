import { NextApiRequest, NextApiResponse } from "next"
import { client } from "./../../../lib/database"
import { getSession } from "next-auth/react"

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" })
    return
  }

  const email = session.user?.email

  const { movieId } = req.query

  try {
    const res = await client.query(`
    DELETE FROM opinions
    WHERE movie_id = '${movieId}' AND creator = '${email}'
    `)
  } catch {
    res.status(500).json({ message: "Could not delete opinion." })
  }

  res.status(200).json({
    message: "Opinion deleted successfuly.",
  })
}

export default Handler
