import { SlashCommandBuilder,ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { SlashCommand } from "../types";
import {PrismaClient} from "@prisma/client";
import { Interaction } from "discord.js";
import Decrypt from '../lib/crypto/decrypt'
import Embed from '../lib/char_embbed'
import Bind from '../lib/bind'
import client from '../index'

const prisma = new PrismaClient();
const row1:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('male')
            .setLabel('Register as Male')
            .setStyle(ButtonStyle.Primary),
			)
        row1.addComponents(
            new ButtonBuilder()
                .setCustomId('female')
                .setLabel('Register as Female')
                .setStyle(ButtonStyle.Secondary),
                );
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("bind")
    .setDescription("register your account to the discord")
    .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
    .addStringOption(option => option.setName('password').setDescription('Your password').setRequired(true)),
    execute: async interaction => {
        const username = String(interaction.options.get("username")?.value)
        const password = String(interaction.options.get("password")?.value)
        const discord = await prisma.discord.findFirst({where:{discord_id:interaction.user.id}}).catch(e=>console.log(e))
        const user:any = await prisma.users.findFirst({where:{username:username}}).catch(e=>console.log(e))
        if (discord!==null) {await prisma.$disconnect();return interaction.reply({content:"you are already registered",ephemeral:true})};
        if (user===null) {await prisma.$disconnect();return interaction.reply({content:"cant find username",ephemeral:true})};
        if (await Decrypt(password,String(user.password))){
            interaction.deferReply({ephemeral:true})
            const character = await prisma.characters.findFirst({where:{user_id:user.id}}).catch(e=>console.log(e))
            const embed  = await Embed(Number(character?.id))
            await new Promise(()=>setTimeout(()=>interaction.editReply({components:[row1],embeds:[embed[0]],files:[embed[1]]}).catch(e=>console.log(e)),2000))
            client.on('interactionCreate', async (interaction:Interaction) =>{
                if (interaction.isButton()){
                    if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch(e=>console.log(e));return}
                    switch (interaction.customId){
                        case "male":{await Bind(interaction.user.id,Number(character?.id),true);await interaction.reply({content:"Registered as male",ephemeral:true}).catch(e=>console.log(e));break}
                        case "female":{await Bind(interaction.user.id,Number(character?.id),false);await interaction.reply({content:"Registered as female",ephemeral:true}).catch(e=>console.log(e));break}
                }}
            })
            await new Promise(()=>setTimeout(()=>interaction.editReply({components:[],embeds:[],files:[]}).catch(e=>console.log(e)),20000))
            await prisma.$disconnect()
            return
        } else {
            await prisma.$disconnect()
            return interaction.reply({content:"pasword not match",ephemeral:true})
        }
    },
    cooldown: 10
}

export default command;