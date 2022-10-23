import {EmbedBuilder} from 'discord.js'
import {PrismaClient} from "@prisma/client";
import client from '../../index'

const prisma = new PrismaClient();

export default async function Cooldown() {
    const bounty = await prisma.bounty.findMany({select:{title:true,cooldown:true,explain:true},orderBy:{title:'asc'}})
    await prisma.$disconnect()
    let embed =new EmbedBuilder()
        .setTitle("Cooldown Info")
        .setThumbnail(String(client.user?.displayAvatarURL()))
    bounty.map(e=>{
        embed.addFields({name:e.title,value:`${e.explain}\n available : ${e.cooldown}`})
    })
    return embed
}