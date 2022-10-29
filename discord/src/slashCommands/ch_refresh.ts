import { SlashCommandBuilder,PermissionFlagsBits} from "discord.js"
import {writeFileSync } from "fs";
import getBuff from "../lib/urlbuf";
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ch_refresh")
    .setDescription("change refresh behavior file")
    .addAttachmentOption(o=>o.setName('json').setDescription('send gacha.json file').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        const json = String(interaction.options.get('json')?.attachment?.url)
        const data = await getBuff(json)
        writeFileSync('prerender_data/refresh.json',data)
        interaction.reply({content:"success adding config",ephemeral:true})
    },
    cooldown: 10
}

export default command