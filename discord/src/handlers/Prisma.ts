import { color } from "../functions";
import { PrismaClient } from '@prisma/client'

module.exports = async () => {
    const prisma = new PrismaClient()
    console.log(color("text",`🐘 Prisma-Postgres connection has been ${color("variable", "established.")}`))
    await prisma.$disconnect()
}