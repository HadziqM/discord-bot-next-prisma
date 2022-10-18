import {PrismaClient} from "@prisma/client";
import Hash from './crypto/hash'

const prisma = new PrismaClient();

export default async function Adpw(did:string,password:string) {
    const discord = await prisma.discord.findFirst({where:{discord_id:did}})
    if (discord === null){await prisma.$disconnect();return false}
    const char = await prisma.characters.findFirst({where:{id:discord?.char_id}})
    const hash = await Hash(password)
    await prisma.users.update({where:{id:char?.user_id},data:{password:hash}})
    await prisma.$disconnect()
    return true
}