import { SlashCommandBuilder} from "discord.js"
import { SlashCommand } from "../types";
import getBuff from '../lib/urlbuf'
import Check from '../lib/registercheck'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const savelist = ['savedata','partner','decomyset',' hunternavi','otomoairou','platebox','platedata','platemyset','rengokudata','savemercenary','skin_hist']
const savedata = savelist.map(e=>`${e}.bin`)

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("send your save data to server")
    .addAttachmentOption(option => option.setName('attachment').setDescription('attach one of the fformatted save data').setRequired(true))
    ,
    execute: async interaction => {
        await interaction.reply({content:"evaluating savefile you send\nmake sure youare loged out from game otherwise this will no effect",ephemeral:true})
        const attachment:any = interaction.options.get('attachment')?.attachment;
        const data1 = await getBuff(attachment.url)
        const discord = await Check(interaction.user.id)
        if(!discord){await prisma.$disconnect();return interaction.followUp({content:"youare not registered",ephemeral:true})}
        const final = attachment.size >= 100000? 0:(!savedata.includes(attachment.name)) ? 1 : 2
        const ch = interaction.client.channels.cache.get(process.env.TRANSVER_SAVE_LOG_CHANNEL)
        if (!ch?.isTextBased())return
        switch (final){
            case 0:{await prisma.$disconnect();return interaction.followUp({content:"please dont send malicius file",ephemeral:true})}
            case 1:{await prisma.$disconnect();return interaction.followUp({content:"file format invalid",ephemeral:true})}
            case 2:{
                switch (attachment.name){
                    case savedata[0]:{await prisma.characters.update({where:{id:discord},data:{savedata:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[1]:{await prisma.characters.update({where:{id:discord},data:{partner:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[2]:{await prisma.characters.update({where:{id:discord},data:{decomyset:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[3]:{await prisma.characters.update({where:{id:discord},data:{hunternavi:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[4]:{await prisma.characters.update({where:{id:discord},data:{otomoairou:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[5]:{await prisma.characters.update({where:{id:discord},data:{platebox:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[6]:{await prisma.characters.update({where:{id:discord},data:{platedata:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[7]:{await prisma.characters.update({where:{id:discord},data:{platemyset:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[8]:{await prisma.characters.update({where:{id:discord},data:{rengokudata:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[9]:{await prisma.characters.update({where:{id:discord},data:{savemercenary:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    case savedata[10]:{await prisma.characters.update({where:{id:discord},data:{skin_hist:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});ch.send(`${interaction.user.username}#${interaction.user.discriminator} transfer ${attachment.name} to server`)}
                    default:{return interaction.followUp({content:`wrong file format`,ephemeral:true})}
                }
            }
        }
    },
    cooldown: 5
}

export default command