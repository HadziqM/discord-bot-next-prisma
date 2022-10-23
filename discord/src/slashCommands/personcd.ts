import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
import Cooldown from '../lib/cooldown'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("resetcd")
    .setDescription("Reset persons cd to 0")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(true)),
    execute: async interaction => {
        const mentions = String(interaction.options.get("mentions")?.value)
        const data = mentions.match(/<@!?([0-9]+)>/g)
        if(data === null ){interaction.reply({content:"No mentions Detected",ephemeral:true});return}
        const ids = data?.map(e=>String(e.match(/([0-9]+)/g)))
        const res = Cooldown(ids)
        if (!res) return interaction.reply('error on server connection')
        interaction.reply(`${mentions}'cd succesfully reseted`)
    },
    cooldown: 10
}

export default command