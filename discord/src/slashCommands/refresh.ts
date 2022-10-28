import { SlashCommandBuilder,PermissionFlagsBits} from "discord.js"
import { SlashCommand } from "../types";
import Refresh from '../lib/bounty/refresh'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("refresh bounty cd")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        const res = await Refresh()
        if(!res) return interaction.reply({ephemeral:true,content:"error while connecting to server, try again after few minutes"})
        interaction.reply({ephemeral:true,content:"successfully refreshed"})
    },
    cooldown: 10
}

export default command