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

  let requests

  try {
    requests = await client.query(`
    SELECT users.id, request_from, username FROM friends 
    JOIN users ON users.email = friends.request_from 
    WHERE request_to = '${email}' 
    AND status = 'pending'
    `)
  } catch {
    res.status(500).json({ message: "Could not recieve friend request." })
  }

  res.status(200).json({ requests: requests?.rows })
}

export default Handler
