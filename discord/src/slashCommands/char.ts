import { SlashCommandBuilder, EmbedBuilder,AttachmentBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import {ButtonBuilder,ButtonStyle,ActionRowBuilder} from 'discord.js'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("reg")
    .setDescription("just char")
    ,
    execute: async (interaction) => {
        console.log(__dirname)
        interaction.deferReply()
        const attachment:any = new AttachmentBuilder(__dirname + "\\icon\\b.png")
        const did = interaction.user.id
        const charachter :any =  did ? await prisma.discord.findFirst({where:{discord_id:String(did)}}).catch(e=>console.log(e)):null
        const discord:any = charachter ? await prisma.characters.findFirst({where:{id:charachter.char_id}}).catch(e=>console.log(e)):null
        await prisma.$disconnect()
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
        await prisma.$disconnect()
        await new Promise(r => setTimeout(r, 2000));
        interaction.editReply(discord?{
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: `${interaction.user.username}`})
                .setDescription(`found account \n 📡 name: ${discord.name}`)
                .setColor(getThemeColor("text"))
                .setThumbnail('attachment://favicon.png')
                .setImage('attachment://favicon.png')
            ],components:[row,col],attachments:attachment
        }:"youare not registered").catch((e)=> console.log(e))
    },
    cooldown: 10
}

export default command