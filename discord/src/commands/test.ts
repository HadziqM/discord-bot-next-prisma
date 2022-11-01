import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "tes",
    execute: async (message, args) => {
        message.channel.send("tis")
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command