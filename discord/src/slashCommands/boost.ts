import { SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Check from '../lib/registercheck'
import Boost from '../lib/boost'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("boost")
    .setDMPermission(false)
    .setDescription("show boost status"),
    execute: async interaction => {
        const disc = await Check(interaction.user.id)
        if (!disc) return interaction.reply("you are not registered")
        let embed = await Boost(disc)
        embed.setFooter({ text: `owned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.reply({embeds:[embed]})
    },
    cooldown: 10 
}

export default command;