// This is an example of to protect an API route
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const prisma = new PrismaClient();
    const { did } = req.query
    const disc: any = await prisma.discord.findFirst({where:{discord_id:`${did}`}})
    const users: any = await prisma.characters.findFirst({where:{id:disc.char_id}})
    await prisma.$disconnect()
    return res.status(200).json({ user:users  })
  }
  res.send({
    error: "You must be signed in to view the protected content on this page.",
  })
}
