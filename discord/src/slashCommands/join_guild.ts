import { SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Gjoin from '../lib/joinguild'
import Dcheck from '../lib/registercheck'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("join_guild")
    .setDescription("register your account to guild")
    .addStringOption(option => option.setName('guild').setDescription('select guild you want to join').setRequired(true).setAutocomplete(true)),
    execute: async interaction => {
        const check = await Dcheck(interaction.user.id)
        if (!check){return interaction.reply("you are not registered")}
        interaction.deferReply()
        const name = String(interaction.options.get("guild")?.value)
        const bool = await Gjoin(name,check)
        bool? await new Promise(()=>setTimeout(()=>interaction.editReply(`you have joined guild ${name}`),2000)):await new Promise(()=>setTimeout(()=>interaction.editReply('join failed, make sure youre not in any guild'),2000))
    },
    cooldown: 10
}

export default command;