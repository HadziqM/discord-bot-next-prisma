import { SlashCommandBuilder, EmbedBuilder,AttachmentBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import {ButtonBuilder,ButtonStyle,ActionRowBuilder} from 'discord.js'
import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const iconlist = ['./icon/GS.png', './icon/HS.png', './icon/H.png', './icon/L.png', './icon/SS.png', './icon/LB.png', './icon/DS.png',
'./icon/LS.png', './icon/HH.png', './icon/GL.png', './icon/B.png', './icon/T.png', './icon/SAF.png', './icon/MS.png']


const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("mycard")
    .setDescription("just char")
    ,
    execute: async (interaction) => {
        interaction.deferReply()
        const did = interaction.user.id
        const discord :any =  did ? await prisma.discord.findFirst({where:{discord_id:String(did)}}).catch(e=>console.log(e)):null
        const charachter:any = discord ? await prisma.characters.findFirst({where:{id:discord.char_id}}).catch(e=>console.log(e)):null
        const user:any = charachter ? await prisma.users.findFirst({where:{id:charachter.user_id}}).catch(e=>console.log(e)):null
        const gid:any = discord ? await prisma.guild_characters.findFirst({where:{character_id:discord.char_id}}).catch(e=>console.log(e)):"no guild"
        const guild:any  = gid ? await prisma.guilds.findFirst({where:{id:gid.guild_id}}).catch(e=>console.log(e)): gid === "no guild" ? "no id":null
        await prisma.$disconnect()
        const gender =discord ? discord.is_male ? "Male" : "Female" : null
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
                .setLabel('Turn Login Boost On')
                .setStyle(ButtonStyle.Secondary),
                );
        const row3:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('nothing')
            .setLabel('Do Nothing')
            .setStyle(ButtonStyle.Danger),
			)
        await prisma.$disconnect()
        const attachment: any = new AttachmentBuilder(iconlist[charachter.weapon_type])
        await new Promise(r => setTimeout(r, 2000));
        interaction.editReply(discord?{
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: `${charachter.name}`})
                .setFooter({text:`owned by ${interaction.user.username}`, iconURL:`${interaction.user.displayAvatarURL()}`})
                .setColor(getThemeColor("text"))
                .setThumbnail(`attachment://${iconlist[charachter.weapon_type].replace('./icon/','')}`)
                .addFields(
                {name:"User", value:`Username:${user.username}\nUser_ID:${user.id}\nChar_Id:${charachter.id}\nLast Login:<t:${charachter.last_login}:R>`,inline:false},
                {name:"Character", value:`Gender:${gender}\nHRP:${charachter.hrp}\nGR:${charachter.gr}`,inline:false},
                {name:"Guild", value:`Guild:${guild.name}\nGuild_ID:${guild.id}\nLeader_Id:${guild.leader_id}`,inline:false})
            ],components:[row1,row2,row3],files: [attachment]
        }:"youare not registered").catch((e)=> console.log(e))
        await new Promise(r => setTimeout(r, 10000));
        interaction.editReply({embeds:[],components:[],files:[],content:"timeout"})
    },
    cooldown: 10
}
            
            export default command