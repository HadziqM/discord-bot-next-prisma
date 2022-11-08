import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";

const buttonSave = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(new ButtonBuilder()
        .setLabel("DM Save")
        .setCustomId("save2")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("💝")
    ).addComponents(
        new ButtonBuilder()
        .setCustomId("import")
        .setLabel("Transfer Savefile")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("👼")
    )
const buttonReg = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("create")
            .setLabel("Create New Account")
            .setStyle(ButtonStyle.Success)
            .setEmoji("🆕")
        ).addComponents(
            new ButtonBuilder()
            .setCustomId("bind")
            .setLabel("Bind Your Account")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("🎀")
        )
const buttonBoost = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("boost_on2")
            .setLabel("Turn on Login Boost")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("🤡")
        ).addComponents(
            new ButtonBuilder()
            .setCustomId("boost_off2")
            .setLabel("Turn off Login Boost")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("💪")
        )

const buttonTransmog = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("transmog2")
            .setLabel("Get Transmog")
            .setStyle(ButtonStyle.Success)
            .setEmoji("💸")
        )
const embed = new EmbedBuilder()
        .setTitle("Rain Server MHFZ Game Interface")
        .setColor('Aqua')
        .setDescription("As alternatif to using command you can use this button bellow as sortcut")
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("interface")
    .setDMPermission(false)
    .setDescription("Show bot alternative interface")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: interaction => {
        interaction.reply({embeds: [embed],components:[buttonReg,buttonSave,buttonBoost,buttonTransmog]})
    },
    cooldown: 10
}

export default command