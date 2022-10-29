import {BotEvent} from '../types'
import {GuildMember,EmbedBuilder} from 'discord.js'
import { getThemeColor } from '../functions'
import client from '../index'

const event:BotEvent = {
    name:'guildMemberRemove',
    execute: async (member:GuildMember) =>{
        const role = member.roles.cache
        const embed = new EmbedBuilder().setThumbnail(member.displayAvatarURL()).setTitle("Member Leave").setDescription(member.toString()).setColor(getThemeColor('data')).addFields(
            {name:"Joined Since",value:`<t:${Math.floor(Number(member.joinedTimestamp)/1000)}:R>`},
            {name:"Roles",value:`${role?.map(e=>e.toString()+"\n")}`},
            {name:"Member Count",value:`${member.guild.memberCount}`}
           )
        const chan = await client.channels.fetch(process.env.LEAVE_CHANNEL)
        chan?.isTextBased() ? chan.send({embeds:[embed]}):null
    }}
export default event