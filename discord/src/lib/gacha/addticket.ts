import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function Gacha(type:number,ids:string[],value:number) {
    let res = true
    if (type==2){
        await Promise.all(ids.map( async e => {
            const disc = await prisma.discord.findUnique({where:{discord_id:e},select:{gacha:true}})
            await prisma.discord.update({where:{discord_id:e},data:{gacha:Number(disc?.gacha)+value}})
        })).catch(e => res = false)
    }else{
        const disc = await prisma.discord.findMany({select:{gacha:true,discord_id:true}})
        await Promise.all(disc.map( async e => {
            await prisma.discord.update({where:{discord_id:e.discord_id},data:{gacha:Number(e.gacha)+value}})
        })).catch(e => res = false)
    }
    await prisma.$disconnect()
    return res
}