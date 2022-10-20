import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
import Unbind from '../lib/unbind'

const registered = process.env.REGISTERED_ROLE
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("unbind")
    .setDescription("Unbind Persons charachter from database")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(true)),
    execute: async interaction => {
        const mentions = String(interaction.options.get("mentions")?.value)
        const data = mentions.match(/<@!?([0-9]+)>/g)
        const role:any = interaction.guild?.roles.cache.find((r) => r.id === String(registered))
        if(data === null ){interaction.reply({content:"No mentions Detected",ephemeral:true});return}
        const ids = data?.map(e=>e.match(/([0-9]+)/g))
        try{ids.map(async e => {
            await Unbind(String(e));
            const user = await interaction.guild?.members.fetch(String(e))
            await user?.roles.remove(role)
        })}catch(error){interaction.reply({content:"error while unbind",ephemeral:true})}
        interaction.reply(`${mentions} succesfully unbind`)
    },
    cooldown: 10
}

export default command