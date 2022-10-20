import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Glist() {
    const user = await prisma.guilds.findMany({orderBy:{name:'asc'},select:{name:true}}).catch(e=>console.log(e))
    var guild = user?.map(e => e.name)
    await prisma.$disconnect()
    return guild
}