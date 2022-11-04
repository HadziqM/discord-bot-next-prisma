import { PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Adpw from '../lib/adminpw'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("mod_pass")
    .setDescription("change persons password if theyare unregistered")
    .addStringOption(option => option.setName('username').setDescription('Person Username').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('password').setDescription('Person New Pasword').setRequired(true)),
    execute: async interaction => {
        if(interaction.guild?.id !== "937230168223789066") return interaction.reply({content:"you can only use this on rain server as admin there",ephemeral:true})
        const password = String(interaction.options.get("password")?.value)
        const username = String(interaction.options.get("username")?.value)
        const data = await Adpw(username,password)
        if (data){interaction.reply({content:"Password Successfully Changed",ephemeral:false})
        }else{interaction.reply({content:"Error Changing Pasword Make Sure Username exist on database",ephemeral:true})}
    },
    cooldown: 10
}

export default command;