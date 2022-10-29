import { SlashCommandBuilder, PermissionFlagsBits} from "discord.js"
import { SlashCommand } from "../types";
import Update from '../lib/update'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("update")
    .setDescription("scaffold rule message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute:async interaction => {
        interaction.reply({ephemeral:true,content:'ok'})
        await Update()
        interaction.followUp('successfully updated to server and optimized')
    },
    cooldown: 10
}

export default command