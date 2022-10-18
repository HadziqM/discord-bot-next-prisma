import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
import Unbind from '../lib/unbind'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("unbind")
    .setDescription("Unbind Persons charachter from database")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(true)),
    execute: async interaction => {
        const mentions = String(interaction.options.get("mentions")?.value)
        const data = mentions.match(/<@!?([0-9]+)>/g)
        if(data === null ){interaction.reply({content:"No mentions Detected",ephemeral:true});return}
        const ids = data?.map(e=>e.match(/([0-9]+)/g))
        try{ids.map(async (e:any) => await Unbind(e))}catch(error){interaction.reply({content:"error while unbind",ephemeral:true})}
        interaction.reply(`${mentions} succesfully unbind`)
    },
    cooldown: 10
}

export default command