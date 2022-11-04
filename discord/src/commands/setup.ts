import { PermissionFlagsBits} from "discord.js";
import client from "..";
import { Command } from "../types";

const command : Command = {
    name: "setup_bot",
    execute: (message, args) => {
        const idk = require('../handlers/Command')
        idk(client)
        message.channel.send("application command re-applied to to all server")
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command