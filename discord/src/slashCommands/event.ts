import { SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Embed from '../lib/gacha/embed'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("event")
    .setDMPermission(false)
    .setDescription("show event status"),
    execute: async interaction => {
        const disc = await Embed(interaction.user.id)
        if (!disc) return interaction.reply('you are not registered ')
        disc.setFooter({ text: `owned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        interaction.reply({embeds:[disc]})
    },
    cooldown: 10 
}

export default command;