import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";
import Update from '../lib/update'  

const command : Command = {
    name: "update",
    execute: async (message, args) => {
        message.channel.send('trying to update guild prerender data')
        await Update().catch(async (e)=>message.channel.send(`error occured\n${e}`))
        message.channel.send('succesfully update prerender data')
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command