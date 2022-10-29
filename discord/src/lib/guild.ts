import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

function level(rp:number){
    if (rp <= 48){return Math.floor(rp/24)}
    else if (rp <= 288){return Math.floor(rp/48)+1}
    else if (rp <= 504){return Math.floor(rp/72)+3}
    else if (rp <= 1080){return Math.floor((rp-24)/96)+5}
    else if (rp < 1200){return 16}
    else {return 17}
}

export default async function Guild() {
    const user=await prisma.guilds.findMany({orderBy:{id:'asc'},select:{name:true,id:true,leader_id:true,created_at:true,rank_rp:true}})
    const guild = Promise.all(user.map(async (e) => {
        const char = await prisma.characters.findFirst({where:{id:e.leader_id},select:{name:true}})
        const discord = await prisma.discord.findFirst({where:{char_id:e.leader_id},select:{discord_id:true}})
        const mention  = discord === null ? "Leader Not Registered" : discord.discord_id
        const length = (await prisma.guild_characters.count({where:{guild_id:e.id}}))
        return {member:length,
                name:e.name,
                id:e.id,
                lead_id:e.leader_id,
                lead:char?.name,
                lead_discord:mention,
                created:Math.floor(new Date(Number(e.created_at)).getTime()/1000),
                rp:e.rank_rp,
                level:level(e.rank_rp)}
    }))
    await prisma.$disconnect()
    return guild
}