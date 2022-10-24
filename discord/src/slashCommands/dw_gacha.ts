import { SlashCommandBuilder,PermissionFlagsBits, AttachmentBuilder } from "discord.js"
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("dw_gacha")
    .setDescription("download gacha's .json")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: interaction => {
        const data = new AttachmentBuilder('./gacha/gacha.json',{name:'gacha.json'})
        interaction.reply({ephemeral:true,files:[data]})
    },
    cooldown: 10
}

export default command