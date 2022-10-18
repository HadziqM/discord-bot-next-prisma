import {PrismaClient} from "@prisma/client";
import Hash from './crypto/hash'

const prisma = new PrismaClient();

export default async function Bind(username:string,password:string) {
    const user=await prisma.users.findFirst({where:{username:username}})
    if (user !== null) {await prisma.$disconnect();return false}
    const hash = await Hash(password)
    await prisma.users.create({data:{username:username,password:hash}})
    await prisma.$disconnect()
    return true
}