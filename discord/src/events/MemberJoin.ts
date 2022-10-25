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
    once:true,
    execute: async (member:GuildMember) =>{
        const jch = await client.channels.fetch(process.env.JOIN_CHANNEL)
        if(!jch?.isTextBased()) return
        const wtf = await getBuff(`${process.env.NEXTAUTH_URL}/api/og/join?url=${member.displayAvatarURL({extension:'png'})}&&name=${member.displayName}`)
        const att = new AttachmentBuilder(wtf,{name:"welcome.jpg"})
        await jch.send({components:[button],files:[att]})
    }
}
export default event