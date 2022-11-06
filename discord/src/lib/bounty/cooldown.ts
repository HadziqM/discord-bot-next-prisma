import {EmbedBuilder} from 'discord.js'
import {PrismaClient} from "@prisma/client";
import client from '../../index'
import { readFileSync } from 'fs';
import { PartnerGuild } from '../../types';

const prisma = new PrismaClient();

export default async function Cooldown() {
    const bounty = await prisma.bounty.findMany({select:{title:true,cooldown:true,explain:true},orderBy:{title:'asc'}})
    await prisma.$disconnect()
    let embed =new EmbedBuilder()
        .setTitle("Cooldown Info")
        .setThumbnail(String(client.user?.displayAvatarURL()))
        .setColor('Random')
    bounty.map(e=>{
        embed.addFields({name:e.title,value:`${e.explain}\n available : ${e.cooldown}`,inline:true})
    })
    const data = String(readFileSync("./guild/guild.json"))
    const json:PartnerGuild = JSON.parse(data)
    for (let i=0;i<json.partner.length;i++){
        const ch = await client.channels.fetch(json.partner[i].cooldown_ch)
        if(ch?.isTextBased()){
            const msg=await ch.messages.fetch(json.partner[i].cooldown_msg)
            msg.edit({embeds:[embed]})
        }
    }
    return embed
}