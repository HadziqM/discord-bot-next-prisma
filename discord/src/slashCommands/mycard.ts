import {  SlashCommandBuilder} from "discord.js"
import { SlashCommand } from "../types";
import {ButtonBuilder,ButtonStyle,ActionRowBuilder} from 'discord.js'
import Embed from '../lib/char_embbed'
import Check from '../lib/registercheck'

const row1 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('save')
            .setLabel('DM Save Data')
            .setStyle(ButtonStyle.Primary),
			)
        row1.addComponents(
            new ButtonBuilder()
                .setCustomId('transmog')
                .setLabel('Apply Transmog')
                .setStyle(ButtonStyle.Primary),
                );
        const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('boost_on')
            .setLabel('Turn Login Boost On')
            .setStyle(ButtonStyle.Secondary),
			)
        row2.addComponents(
            new ButtonBuilder()
                .setCustomId('boost_off')
                .setLabel('Turn Login Boost Off')
                .setStyle(ButtonStyle.Secondary),
                );
        const row3 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('nothing')
            .setLabel('Do Nothing')
            .setStyle(ButtonStyle.Danger),
            )

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("mycard")
    .setDescription("show your hunter status")
    ,
    execute: async (interaction) => {
        interaction.deferReply()
        const char = await Check(interaction.user.id)
        if (!char) {
            await new Promise(r => setTimeout(r, 3000));
            return interaction.editReply("youare not registered")
        } 
        let lib = await Embed(char)
        lib[0].setFooter({ text: `owned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        await new Promise(r => setTimeout(r, 2000));
        interaction.editReply({
            embeds: [lib[0]],components:[row1,row2,row3],files: [lib[1]]
        }).catch((e)=> console.log(e))
        await new Promise(()=>setTimeout(()=>interaction.editReply({components:[]}),10000))
    },
    cooldown: 10
}
export default command