import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits,ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import Guild from '../lib/guild'
import client from "../index";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

const row2:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('wtf')
            .setLabel('wtf')
            .setStyle(ButtonStyle.Secondary),
			)
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Shows the bot's ping")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        interaction.reply({components:[row2]})
        
    },
    cooldown: 10
}

export default command