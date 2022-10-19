import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Gjoin(name:string,discord_id:string) {
    const discord = await prisma.discord.findFirst({where:{discord_id:discord_id}})
    const guild_characters = await prisma.guild_characters.findFirst({where:{character_id:discord?.char_id}})
    if (guild_characters === null){await prisma.$disconnect();return false}
    const guild = await prisma.guilds.findFirst({where:{name:name}})
    await prisma.guild_characters.create({data:{character_id:Number(discord?.char_id),guild_id:Number(guild?.id)}})
    await prisma.$disconnect()
    return true
}