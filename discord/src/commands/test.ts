import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "tes",
    execute: async (message, args) => {
        const embed = new EmbedBuilder()
            .setTitle('tested')
        message.channel.send({embeds:[embed]})
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command