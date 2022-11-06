import {getThemeColor} from '../../functions'
import client from '../../index'
import {EmbedBuilder} from 'discord.js'
import {PrismaClient} from "@prisma/client";
import { readFileSync } from 'fs';
import { PartnerGuild } from '../../types';

const prisma = new PrismaClient();

export default  async function Leaderboard() {
    let lead = await prisma.discord.findMany({select:{bounty:true,discord_id:true,char_id:true},orderBy:{bounty:'desc'},where:{NOT:[{bounty:null}]}})
    lead.slice(0,10)
    const firstid = await prisma.characters.findUnique({where:{id:lead[0].char_id},select:{name:true}})
    let first = await client.users.fetch(lead[0].discord_id)
    let user = [first.username]
    let bounty = [lead[0].bounty]
    let embed = new EmbedBuilder()
        .setTitle("Leaderboard")
        .setColor(getThemeColor('variable'))
        .setThumbnail(first.displayAvatarURL())
        .addFields({name:user[0],value:` 🗂️ Ign: ${firstid?.name}\n 🪙 Coin: ${lead[0].bounty}`})
        .setColor('Random')
    for (let i = 1;i<9;i++){
        const uname = await client.users.fetch(lead[i].discord_id)
        const char = await prisma.characters.findUnique({where:{id:lead[i].char_id},select:{name:true}})
        user.push(uname.username)
        bounty.push(lead[i].bounty)        
        embed.addFields({name:user[i],value:` 🗂️ Ign: ${char?.name}\n 🪙 Coin: ${lead[i].bounty}`})
        
    }
    const data = String(readFileSync("./guild/guild.json"))
    const json:PartnerGuild = JSON.parse(data)
    for (let i=0;i<json.partner.length;i++){
        const ch = await client.channels.fetch(json.partner[i].leaderboard_ch)
        if(ch?.isTextBased()){
            const msg=await ch.messages.fetch(json.partner[i].leaderboard_msg)
            msg.edit({embeds:[embed]})
        }
    }
    await prisma.$disconnect()
    return {embed:embed}
}