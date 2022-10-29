import { PermissionFlagsBits} from "discord.js";
import { Command } from "../types";
import Update from '../lib/blog/prerender'

const command : Command = {
    name: "render",
    execute: async (message, args) => {
        await Update()
        message.channel.send('successfully updated to server and optimized')
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command