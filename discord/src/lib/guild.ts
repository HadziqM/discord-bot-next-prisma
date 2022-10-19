import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Guild() {
    const user=await prisma.guilds.findMany({orderBy:{id:'asc'}})
    // const guild = Promise.all(user.map(async (e) => {
    //     console.log(e.id)
    //     const char = await prisma.characters.findFirst({where:{id:e.leader_id}})
    //     const discord = await prisma.discord.findFirst({where:{char_id:e.leader_id}})
    //     const mention  = discord === null ? "Leader Not Registered" : discord.discord_id
    //     const length = (await prisma.guild_characters.findMany({where:{guild_id:e.id}})).length
    //     return {member:length,
    //             name:e.name,
    //             id:e.id,
    //             lead_id:e.leader_id,
    //             lead:char?.name,
    //             lead_discord:mention,
    //             created:Math.floor(new Date(Number(e.created_at)).getTime()/1000),
    //             rp:e.rank_rp}
    // }))
    let data = []
    for (let i = 0;i<user.length;i++){
        const char = await prisma.characters.findFirst({where:{id:user[i].leader_id}})
        const discord = await prisma.discord.findFirst({where:{char_id:user[i].leader_id}})
        const mention  = discord === null ? "Leader Not Registered" : discord.discord_id
        const length = (await prisma.guild_characters.findMany({where:{guild_id:user[i].id}})).length
        const data1 = {member:length,
                        name:user[i].name,
                        id:user[i].id,
                        lead_id:user[i].leader_id,
                        lead:char?.name,
                        lead_discord:mention,
                        created:Math.floor(new Date(Number(user[i].created_at)).getTime()/1000),
                        rp:user[i].rank_rp}
        data.push(data1)
    }
    await prisma.$disconnect()
    return data
}