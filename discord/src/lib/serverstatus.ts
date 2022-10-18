import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Status() {
    const user=await prisma.users.findMany()
    const channel = await prisma.characters.findMany()
    const register = await prisma.discord.findMany()
    await prisma.$disconnect()
    return {user:user.length, channel:channel.length, registered:register.length}
}