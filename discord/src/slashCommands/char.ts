import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import {ButtonBuilder,ButtonStyle,ActionRowBuilder} from 'discord.js'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("char")
    .setDescription("just char")
    ,
    execute: async (interaction) => {
        const row:any = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);
        const discord: any = await prisma.characters.findFirst({
            where: {
              id: 843,
            },
          });
        await prisma.$disconnect()
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: "Hertz"})
                .setDescription(`found account \n 📡 name: ${discord.name}`)
                .setColor(getThemeColor("text"))
            ], components:[row]
        })
    },
    cooldown: 10
}

export default command