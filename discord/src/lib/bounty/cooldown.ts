import {EmbedBuilder} from 'discord.js'
import {PrismaClient} from "@prisma/client";
import client from '../../index'

const prisma = new PrismaClient();

export default async function Cooldown() {
    const bounty = await prisma.bounty.findMany({select:{title:true,cooldown:true}})
    await prisma.$disconnect()
    let check = "```rust\n"
    bounty.map(e=>{
        check += `${e.title} -> ${e.cooldown} \n`
    })
    check += "```"
    return new EmbedBuilder()
        .setTitle("Cooldown Info")
        .setDescription(check)
        .setThumbnail(String(client.user?.displayAvatarURL()))
}