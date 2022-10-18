import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import Guild from '../lib/guild'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's ping")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        interaction.deferReply()
        const guild = await Guild()
        console.log(guild[0])
        await new Promise(()=>setTimeout(async ()=>interaction.editReply({files:[{attachment:(await guild[0]).icon}]}),2000))
    },
    cooldown: 10
}

export default command