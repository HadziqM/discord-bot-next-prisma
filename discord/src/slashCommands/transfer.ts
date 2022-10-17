import { SlashCommandBuilder} from "discord.js"
import { SlashCommand } from "../types";
import getBuff from '../lib/urlbuf'
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
        const discord:any = await prisma.discord.findFirst({where:{discord_id:interaction.user.id}})
        const final = attachment.size >= 100000? 0:(!savedata.includes(attachment.name)) ? 1 : 2
        switch (final){
            case 0:{interaction.followUp({content:"please dont send malicius file",ephemeral:true});break}
            case 1:{interaction.followUp({content:"file format invalid",ephemeral:true});break}
            case 2:{
                switch (attachment.name){
                    case savedata[0]:{await prisma.characters.update({where:{id:discord.char_id},data:{savedata:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[1]:{await prisma.characters.update({where:{id:discord.char_id},data:{partner:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[2]:{await prisma.characters.update({where:{id:discord.char_id},data:{decomyset:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[3]:{await prisma.characters.update({where:{id:discord.char_id},data:{hunternavi:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[4]:{await prisma.characters.update({where:{id:discord.char_id},data:{otomoairou:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[5]:{await prisma.characters.update({where:{id:discord.char_id},data:{platebox:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[6]:{await prisma.characters.update({where:{id:discord.char_id},data:{platedata:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[7]:{await prisma.characters.update({where:{id:discord.char_id},data:{platemyset:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[8]:{await prisma.characters.update({where:{id:discord.char_id},data:{rengokudata:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[9]:{await prisma.characters.update({where:{id:discord.char_id},data:{savemercenary:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                    case savedata[10]:{await prisma.characters.update({where:{id:discord.char_id},data:{skin_hist:data1}}).catch(e=>console.log(e));interaction.followUp({content:`uploaded ${attachment.name} to the server\nlog in to the game to make it takes effect`,ephemeral:true});break}
                }
            }
        }
    },
    cooldown: 5
}

export default command