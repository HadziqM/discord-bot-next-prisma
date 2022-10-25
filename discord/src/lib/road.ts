import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function Road() {
    const road  = (await prisma.rengoku_score.findMany({orderBy:{max_stages_mp:'desc'},select:{max_stages_mp:true,character_id:true}})).slice(0,10)
    try{
    const data = Promise.all(road.map(async e =>{
        const name = await prisma.characters.findUnique({where:{id:e.character_id},select:{name:true}})
        const disc = await prisma.discord.findFirst({where:{char_id:e.character_id},select:{discord_id:true}})
        return ({name:name?.name,discord:disc?.discord_id,stage:e.max_stages_mp})
    }))
    return data
    }catch(e){
        return false
    }
}