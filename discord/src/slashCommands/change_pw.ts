import { SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Chpw from '../lib/changepw'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("change_password")
    .setDescription("register new user to database")
    .addStringOption(option => option.setName('password').setDescription('Your new password').setRequired(true)),
    execute: async interaction => {
        const password = String(interaction.options.get("password")?.value)
        const data = await Chpw(interaction.user.id,password)
        if (data){interaction.reply({content:"Password Successfully Changed",ephemeral:true})
        }else{interaction.reply({content:"Error Changing Pasword Make Sure Youare Registered",ephemeral:true})}
    },
    cooldown: 10
}

export default command;