import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Unbind(did:string) {
    await prisma.discord.delete({where:{discord_id:did}})
    await prisma.$disconnect()
}