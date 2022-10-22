import { PermissionFlagsBits,EmbedBuilder } from "discord.js";
import { Command } from "../types";
import { getThemeColor } from '../functions';

const command : Command = {
    name: "test",
    execute: async (message, args) => {
       const role =  message.member?.roles.cache
       message.channel.send('wait')
       const embed = new EmbedBuilder().setThumbnail(message.author.displayAvatarURL()).setTitle("Member Leave").setDescription(message.author.toString()).setColor(getThemeColor('data')).addFields(
        {name:"Joined Since",value:`<t:${Math.floor(Number(message.member?.joinedTimestamp)/1000)}:R>`},
        {name:"Roles",value:`${role?.map(e=>e.toString()+"\n")}`},
        {name:"Member Count",value:`${message.guild?.memberCount}`}
       )
       message.channel.send({embeds:[embed]})
    },
    cooldown: 10,
    aliases: ["sayerror"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command


