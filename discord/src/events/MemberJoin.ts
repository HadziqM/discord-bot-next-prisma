import { GuildMember,AttachmentBuilder,ButtonBuilder,ActionRowBuilder, ButtonStyle } from "discord.js";
import { BotEvent } from "../types";
import client from '../index'
import getBuff from '../lib/urlbuf'


const button = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                    .setURL(process.env.RULE_URL)
                    .setLabel("Proceed")
                    .setStyle(ButtonStyle.Link)
                )
const event:BotEvent = {
    name:'guildMemberAdd',
    execute: async (member:GuildMember) =>{
        if(member.guild.id !== "937230168223789066") return
        const jch = await client.channels.fetch(process.env.JOIN_CHANNEL)
        if(!jch?.isTextBased()) return
        const url = JSON.stringify({url:member.displayAvatarURL({extension:'png'}),name:member.user.username})
        const wtf = await getBuff(`${process.env.NEXTAUTH_URL}/api/og/join?url=${url}`)
        const att = new AttachmentBuilder(wtf,{name:"welcome.jpg"})
        await jch.send({components:[button],files:[att],content:`Welcome ${member} to **RAIN SERVER** as ${member.guild.memberCount}th Member`})
    }
}
export default event