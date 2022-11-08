import { SlashCommandBuilder,PermissionFlagsBits} from "discord.js"
import {writeFileSync } from "fs";
import getBuff from "../lib/urlbuf";
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ch_refresh")
    .setDMPermission(false)
    .setDescription("change refresh behavior file")
    .addAttachmentOption(o=>o.setName('json').setDescription('send gacha.json file').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        if(interaction.guild?.id !== "937230168223789066") return interaction.reply({content:"you can only use this on rain server as admin there",ephemeral:true})
        const json = String(interaction.options.get('json')?.attachment?.url)
        const data = await getBuff(json)
        writeFileSync('prerender_data/refresh.json',data)
        interaction.reply({content:"success adding config",ephemeral:true})
    },
    cooldown: 10
}

export default command