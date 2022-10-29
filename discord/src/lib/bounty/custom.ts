import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";


const prisma = new PrismaClient()

export default async function Custom(ids:string[],type:number) {
    const file = readFileSync(`./gacha_b/custom.bin`)
    let res = true
    if (type === 2){
        await Promise.all(ids.map(async e =>{
            const disc = await prisma.discord.findUnique({where:{discord_id:e},select:{char_id:true}})
            await prisma.distribution.create({data:{character_id:disc?.char_id,data:file,type:1,bot:true,event_name:"Custom Gift",description:'~C05Custom Distribution Reward'}})
        })).catch(e=>res = false)
    }else{
        await prisma.distribution.create({data:{data:file,type:1,bot:true,event_name:"Custom Gift",description:'~C05Custom Distribution Reward'}}).catch(e=>res = false)
    }
    return res
}