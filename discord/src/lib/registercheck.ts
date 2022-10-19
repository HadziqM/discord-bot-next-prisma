import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Dcheck(discord_id:string) {
    const discord = await prisma.discord.findFirst({where:{discord_id:discord_id}})
    if (discord === null){await prisma.$disconnect();return false}
    await prisma.$disconnect()
    return true
}