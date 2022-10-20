import {PrismaClient} from "@prisma/client";
import Hash from './crypto/hash'

const prisma = new PrismaClient();

export default async function Regis(username:string,password:string) {
    const user=await prisma.users.findFirst({where:{username:username},select:{id:true}})
    if (user !== null) {await prisma.$disconnect();return false}
    const hash = await Hash(password)
    const date = String(Math.floor(new Date().getTime()/1000) + 30*24*60*60)
    await prisma.users.create({data:{username:username,password:hash,return_expires:date}})
    await prisma.$disconnect()
    return true
}