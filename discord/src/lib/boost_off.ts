import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Boost_off(did:string) {
    const char = await prisma.discord.findFirst({where:{discord_id:did},select:{char_id:true}})
    await prisma.login_boost_state.updateMany({where:{char_id:char?.char_id},data:{end_time:1}}).catch(e=>console.log(e))
    await prisma.$disconnect()
}