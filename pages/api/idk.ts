// This is an example of to protect an API route
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const array = JSON.parse(String(req.query.id))
    return res.status(200).json({ user:array  })
  }
  res.send({
    error: "You must be signed in to view the protected content on this page.",
  })
}
