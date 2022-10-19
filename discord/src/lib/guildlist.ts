import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Glist() {
    const user:any=await prisma.guilds.findMany({orderBy:{name:'asc'}}).catch(e=>console.log(e))
    var guild = user.map((e:any) => e.name)
    await prisma.$disconnect()
    return guild
}