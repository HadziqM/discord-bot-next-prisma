import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Boost_on(did:string) {
    const char = await prisma.discord.findFirst({where:{discord_id:did}}).catch(e=>console.log(e))
    const now = Math.floor(new Date().getTime()/1000)
    const still = Number(char?.boostcd) + (7*24*60*60)
    if (still >= now) return [false,still];
    await prisma.login_boost_state.updateMany({where:{char_id:char?.char_id},data:{week_count:5}}).catch(e=>console.log(e))
    await prisma.login_boost_state.updateMany({where:{char_id:char?.char_id},data:{end_time:0}}).catch(e=>console.log(e))
    await prisma.login_boost_state.updateMany({where:{char_id:char?.char_id},data:{available:true}}).catch(e=>console.log(e))
    await prisma.discord.update({where:{discord_id:did},data:{boostcd:now}})
    await prisma.$disconnect()
    return [true,0]
}