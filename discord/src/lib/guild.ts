import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Guild() {
    const user=await prisma.guilds.findMany({orderBy:{id:'asc'}})
    const guild = user.map(async (e:any) => {
        const char = await prisma.characters.findFirst({where:{id:e.leader_id}})
        const discord = await prisma.discord.findFirst({where:{char_id:e.leader_id}})
        const mention  = discord === null ? "Leader Not Registered" : `<@${discord.discord_id}>`
        return {member:(await prisma.guild_characters.findMany({where:{guild_id:e.id}})).length,
                name:e.name,
                lead_id:e.leader_id,
                lead:char?.name,
                lead_discord:mention,
                icon:e.icon,
                created:(new Date(e.created_at).getTime()/1000),
                rp:e.rank_rp}
    })
    await prisma.$disconnect()
    return guild
}