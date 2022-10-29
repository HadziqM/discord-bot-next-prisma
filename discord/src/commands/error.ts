import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "error",
    execute: async (message, args) => {
        message.channel.send("")
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command