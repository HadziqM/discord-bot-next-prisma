import { SlashCommandBuilder,PermissionFlagsBits} from "discord.js"
import {writeFileSync } from "fs";
import Chgacha from "../lib/gachach";
import getBuff from "../lib/urlbuf";
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ch_gacha")
    .setDescription("change gacha's event file")
    .addAttachmentOption(o=>o.setName('json').setDescription('send gacha.json file').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        const json = String(interaction.options.get('json')?.attachment?.url)
        const data = await getBuff(json)
        writeFileSync('gacha/gacha.json',data)
        await interaction.reply({content:"success adding config",ephemeral:true})
        let res=await Chgacha()
        if(!res) return interaction.followUp({content:'fail while parsing the config, either connection problem or wrong data',ephemeral:true})
        interaction.followUp({content:'success on implementing config',ephemeral:true})
    },
    cooldown: 10
}

export default command