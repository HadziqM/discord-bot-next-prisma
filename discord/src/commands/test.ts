import getBuff from '../lib/urlbuf'
import { PermissionFlagsBits,AttachmentBuilder } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "error1",
    execute: async (message, args) => {
        const wtf = await getBuff(`http://localhost:8080/api/og/og?url=${message.author.displayAvatarURL({extension:'jpg'})}&&name=${message.author.username}`)
        const att = new AttachmentBuilder(wtf,{name:'og.png'})
        console.log(message.author.displayAvatarURL({extension:'jpg'}))
        message.channel.send({files:[att]})
    },
    cooldown: 10,
    aliases: ["sayerror"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command


