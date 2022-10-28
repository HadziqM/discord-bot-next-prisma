import { SlashCommandBuilder,ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType, GuildMemberRoleManager } from "discord.js";
import { SlashCommand } from "../types";
import {PrismaClient} from "@prisma/client";
import Decrypt from '../lib/crypto/decrypt'
import Embed from '../lib/char_embbed'
import Bind from "../lib/bind";

const prisma = new PrismaClient();
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("bind")
    .setDescription("register your account to the discord")
    .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
    .addStringOption(option => option.setName('password').setDescription('Your password').setRequired(true)),
    execute: async interaction => {
        const username = String(interaction.options.get("username")?.value)
        const password = String(interaction.options.get("password")?.value)
        const discord = await prisma.discord.findFirst({where:{discord_id:interaction.user.id},select:{char_id:true}}).catch(e=>console.log(e))
        const user = await prisma.users.findFirst({where:{username:username},select:{id:true,password:true}}).catch(e=>console.log(e))
        if (discord!==null) {await prisma.$disconnect();return interaction.reply({content:"you are already registered",ephemeral:true})};
        if (user===null) {await prisma.$disconnect();return interaction.reply({content:"cant find username",ephemeral:true})};
        if (await Decrypt(password,String(user?.password))){
            const character = await prisma.characters.findFirst({where:{user_id:user?.id},select:{id:true}}).catch(e=>console.log(e))
            if (character == null) return
            const embed  = await Embed(Number(character?.id))
            const row1:any = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`male${interaction.user.id}`)
                    .setLabel('Register as Male')
                    .setStyle(ButtonStyle.Primary),
                    )
                row1.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`female${interaction.user.id}`)
                        .setLabel('Register as Female')
                        .setStyle(ButtonStyle.Secondary),
                        );
            interaction.reply({components:[row1],embeds:[embed[0]],files:[embed[1]]})
            if (!interaction.channel?.isTextBased()) return
            const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 400000 })
            const role = await interaction.guild?.roles.fetch(process.env.REGISTERED_ROLE)
            if (role==null) return
            collector.on('collect', async i => {
                console.log('test')
                console.log(i.customId)
                switch (i.customId){
                    case `male${interaction.user.id}`:{
                        if (interaction.guild == null) return
                        Bind(interaction.user.id,Number(character.id),true)
                        i.reply({content:"congrats you have registered now",ephemeral:true})
                        await (await interaction.guild.members.fetch(interaction.user.id)).roles.add(role)
                        interaction.editReply({components:[]})
                        await prisma.$disconnect()
                        break
                    }
                    case `female${interaction.user.id}`:{
                        if (interaction.guild == null) return
                        Bind(interaction.user.id,Number(character.id),false)
                        i.reply({content:"congrats you have registered now",ephemeral:true})
                        await (await interaction.guild.members.fetch(interaction.user.id)).roles.add(role)
                        interaction.editReply({components:[]})
                        await prisma.$disconnect()
                        break
                    }
                    default:{break}
        }})} else {
            await prisma.$disconnect()
            return interaction.reply({content:"pasword not match",ephemeral:true})
        }
    },
    cooldown: 10
}

export default command;