import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function Buy(value:number,did:string) {
    const dc = await prisma.discord.findUnique({where:{discord_id:did},select:{gacha:true,bounty:true}})
    if (dc==null) return false
    if (Number(dc.bounty) < value*200) return "not enough"
    await prisma.discord.update({where:{discord_id:did},data:{bounty:(Number(dc.bounty)-value*200),gacha:(dc.gacha+value)}})
    await prisma.$disconnect()
    return true
}