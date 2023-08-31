import { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../lib/database"
import { getSession } from "next-auth/react"

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "User is not authenticated" })
    return
  }

  const email = session.user?.email
  let userData

  try {
    userData = await client.query(`SELECT * from users 
    where email = '${email}'`)
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." })
    return
  }
  res.status(200).json({ userData })
}

export default Handler
