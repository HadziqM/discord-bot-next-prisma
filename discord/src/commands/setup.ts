import { PermissionFlagsBits,REST,Routes } from "discord.js";
import { Command } from "../types";
import Setup from "../handlers/Command"

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);
const command : Command = {
    name: "setup",
    execute: (message, args) => {
        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
            .catch(console.error);
        message.channel.send('Successfully added all application commands. to this server')
    },
    cooldown: 10,
    aliases: ["saysetup"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command