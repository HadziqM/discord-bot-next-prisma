import { SlashCommandBuilder} from "discord.js"
import { SlashCommand } from "../types";
import {ButtonBuilder,ButtonStyle,ActionRowBuilder} from 'discord.js'
import {PrismaClient } from "@prisma/client";
import Embed from '../lib/char_embbed'

const prisma = new PrismaClient();

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("mycard")
    .setDescription("show your hunter status")
    ,
    execute: async (interaction) => {
        interaction.deferReply()
        const row1:any = new ActionRowBuilder()
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
        const row2:any = new ActionRowBuilder()
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
        const row3:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('nothing')
            .setLabel('Do Nothing')
            .setStyle(ButtonStyle.Danger),
            )
        const char = await prisma.discord.findFirst({where:{discord_id:interaction.user.id}}).catch(e=>console.log(e)) ?? null
        if (char === null) {
            await new Promise(r => setTimeout(r, 3000));
            return interaction.editReply("youare not registered")
        } 
        let lib = await Embed(Number(char?.char_id))
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