import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import {ButtonBuilder,ButtonStyle,ActionRowBuilder} from 'discord.js'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("button")
    .setDescription("just char")
    ,
    execute: async (interaction) => {
        console.log(__dirname + "\\icon.b.png")
        const row:any = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);
        const col:any = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('secondary')
					.setLabel('Dont Click me!')
					.setStyle(ButtonStyle.Secondary),
			);
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: `${interaction.user.username}`})
                .setDescription(`found account \n 📡 name: wtf`)
                .setColor(getThemeColor("text"))
            ],components:[row,col]
        }).catch((e)=> console.log(e))
    },
    cooldown: 10
}

export default command