import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function Cooldown(ids:string[]) {
    let res = true
        await Promise.all(ids.map( async e => {
            await prisma.discord.update({where:{discord_id:e},data:{latest_bounty_time:0}})
        })).catch(e => res = false)
    await prisma.$disconnect()
    return res
}

export const Bcd = async (bbq:string,value:number) => {
    let res = true
    await prisma.bounty.updateMany({where:{title:bbq},data:{cooldown:value}}).catch(e=> res = false)
    return res
}