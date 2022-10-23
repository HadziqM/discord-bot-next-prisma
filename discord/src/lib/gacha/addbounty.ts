import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function Bounty(type:number,ids:string[],value:number) {
    let res = true
    if (type==2){
        await Promise.all(ids.map( async e => {
            const disc = await prisma.discord.findUnique({where:{discord_id:e},select:{bounty:true}})
            await prisma.discord.update({where:{discord_id:e},data:{bounty:Number(disc?.bounty)+value}})
        })).catch(e => res = false)
    }else{
        const disc = await prisma.discord.findMany({select:{bounty:true,discord_id:true}})
        await Promise.all(disc.map( async e => {
            await prisma.discord.update({where:{discord_id:e.discord_id},data:{bounty:Number(e.bounty)+value}})
        })).catch(e => res = false)
    }
    await prisma.$disconnect()
    return false
}