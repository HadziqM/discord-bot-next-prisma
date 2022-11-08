import { SlashCommandBuilder,PermissionFlagsBits, AttachmentBuilder } from "discord.js"
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("dw_refresh")
    .setDMPermission(false)
    .setDescription("download refresh's .json")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: interaction => {
        const data = new AttachmentBuilder('./prerender_data/refresh.json')
        interaction.reply({ephemeral:true,files:[data]})
    },
    cooldown: 10
}

export default command