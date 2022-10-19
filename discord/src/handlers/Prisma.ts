import { color } from "../functions";
import { PrismaClient } from '@prisma/client'
import Guild from '../lib/guild'
import {writeFile} from 'fs'

module.exports = async () => {
    const prisma = new PrismaClient()
    console.log(color("text","🕛 wait data to be prerendered"))
    const data = await Guild()
    const json = JSON.stringify({guild:data},null,2)
    writeFile('./prerender_data/guild_data.json', json, (err) => {
        if (err) throw err;
        console.log(color("text","📁 successfully write prerender data"));
    });
    console.log(color("text",`🐘 Prisma-Postgres connection has been ${color("variable", "established.")}`))
    await prisma.$disconnect()
}