import { SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";
import { getThemeColor } from "../functions";

import Status from '../lib/serverstatus'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Show Server Status on database")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async interaction => {
        const status = await Status()
        const embed = new EmbedBuilder()
        .setAuthor({name: 'Server Status'})
        .setDescription(`🧑‍🦰 Users : ${status.user} \n ⚔️ Characters: ${status.channel} \n 💳 Registered: ${status.registered}`)
        .setColor(getThemeColor('variable'))
        interaction.reply({embeds:[embed]})
    },
    cooldown: 10
}

export default command