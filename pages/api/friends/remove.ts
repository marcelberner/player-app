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
  const { friendEmail } = req.query

  try {
    const res = await client.query(`
    DELETE FROM friends 

    WHERE 
    (request_from = '${friendEmail}' OR request_to = '${friendEmail}')
     AND
    (request_from = '${email}' OR request_to = '${email}')  
    `)
  } catch {
    res.status(500).json({ message: "Could not remove friend." })
  }

  res.status(200).json({ message: "Friend removed successfuly." })
}

export default Handler
