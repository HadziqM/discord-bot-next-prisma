import { PermissionFlagsBits,REST,Routes } from "discord.js";
import { Command } from "../types";

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);
const command : Command = {
    name: "delete",
    execute: (message, args) => {
        rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [] })
            .catch(console.error);
        message.channel.send('Successfully deleted all application commands.')
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command