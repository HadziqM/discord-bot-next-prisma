import { SlashCommandBuilder, PermissionFlagsBits} from "discord.js"
import { SlashCommand } from "../types";
import Update from '../lib/update'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("update")
    .setDMPermission(false)
    .setDescription("scaffold rule message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute:async interaction => {
        if(interaction.guild?.id !== "937230168223789066") return interaction.reply({content:"you can only use this on rain server as admin there",ephemeral:true})
        interaction.reply({ephemeral:true,content:'ok'})
        await Update()
        interaction.followUp('successfully updated to server and optimized')
    },
    cooldown: 10
}

export default command