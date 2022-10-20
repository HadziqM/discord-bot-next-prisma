import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Dcheck(discord_id:string) {
    const discord = await prisma.discord.findFirst({where:{discord_id:discord_id},select:{char_id:true}})
    if (discord === null){await prisma.$disconnect();return false}
    await prisma.$disconnect()
    return discord.char_id
}