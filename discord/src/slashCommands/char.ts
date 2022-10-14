import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("char")
    .setDescription("just char")
    ,
    execute: async (interaction) => {
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
            ]
        })
    },
    cooldown: 10
}

export default command