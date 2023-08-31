import { NextApiRequest, NextApiResponse } from "next"
import { client } from "./../../../lib/database"
import { getSession } from "next-auth/react"

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" })
    return
  }

  const friendEmail = req.body.email
  const status = req.body.status
  const email = session.user?.email

  if (status !== "accepted" && status !== "declined") {
    res.status(400).json({ message: "Could not add friend." })
    return
  }

  try {
    const res = await client.query(`
    UPDATE friends set status = '${status}' where request_to = '${email}'
    AND request_from = '${friendEmail}'
    `)
  } catch {
    res.status(500).json({ message: "Could not add friend." })
  }
  res.status(200).json({ message: "User added successfully." })
}

export default Handler
