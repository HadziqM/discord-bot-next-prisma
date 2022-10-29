import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function CheckAcc(did:string) {
    let res = true
    const checked = await prisma.discord_register.findUnique({where:{discord_id:did}}).catch(e=>{res = false})
    if (checked == null ) return false
    await prisma.$disconnect()
    return checked
}

export async function Write(did:string,user:number) {
    let res = true
    await prisma.discord_register.create({data:{discord_id:did,user_id:user}}).catch(e=>{res = false})
    await prisma.$disconnect()
    return res
}