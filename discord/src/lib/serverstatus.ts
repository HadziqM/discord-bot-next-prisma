import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Status() {
    const user=await prisma.users.count()
    const channel = await prisma.characters.count()
    const register = await prisma.discord.count()
    await prisma.$disconnect()
    return {user:user, channel:channel, registered:register}
}