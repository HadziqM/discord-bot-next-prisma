import {ActionRowBuilder, SlashCommandBuilder,ButtonBuilder, ButtonStyle} from "discord.js";
import { SlashCommand } from "../types";
import {Scheck,Mcheck} from '../lib/bounty/check'
import {Sembed,Membed,Nembed} from '../lib/bounty/embed'
import client from '../index'
import Submitted from '../lib/bounty/queried'
import Cooldown from '../lib/bounty/cooldown'


function B_build(id:number){
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
        .setCustomId(`approve${id}`)
        .setLabel("approve")
        .setStyle(ButtonStyle.Success)
        .setEmoji("👍")).addComponents(
            new ButtonBuilder()
            .setCustomId(`nope${id}`)
            .setLabel('nope')
            .setStyle(ButtonStyle.Danger)
            .setEmoji("👎")
        )
}


const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("submit")
    .setDescription("submit your bounty for evaluation")
    .addStringOption(o => o.setName('bounty').setDescription('pick category').setRequired(true).addChoices(
        {name:'BBQ01',value:'BBQ01'},
        {name:'BBQ02',value:'BBQ02'},
        {name:'BBQ03',value:'BBQ03'},
        {name:'BBQ04',value:'BBQ04'},
        {name:'BBQ05',value:'BBQ05'},
        {name:'BBQ06',value:'BBQ06'},
        {name:'BBQ07',value:'BBQ07'},
        {name:'BBQ08',value:'BBQ08'},
        {name:'BBQ09',value:'BBQ09'},
        {name:'BBQ10',value:'BBQ10'},
        {name:'BBQ11',value:'BBQ11'},
        {name:'BBQ12',value:'BBQ12'},
        {name:'BBQ13',value:'BBQ13'},
        {name:'BBQ14',value:'BBQ14'},
        {name:'BBQ15',value:'BBQ15'},
        {name:'BBQ16',value:'BBQ16'},
        {name:'BBQ17',value:'BBQ17'},
        {name:'BBQ18',value:'BBQ18'},
        {name:'BBQ19',value:'BBQ19'},
        {name:'BBQ20',value:'BBQ20'},
        {name:'BBQ21',value:'BBQ21'},
        {name:'BBQ22',value:'BBQ22'},
        {name:'BBQ23',value:'BBQ23'},
        {name:'SP',value:'SP'},
    ))
    .addBooleanOption(o => o.setName('npc').setDescription('select true if youare with npc').setRequired(true))
    .addAttachmentOption(option => option.setName('prove').setDescription('send proove of your quest').setRequired(true))
    .addStringOption(o => o.setName('mentions').setDescription('dont fill this if youare solo, fill with mentions if multi')),
    execute: async interaction => {
        const attachment = String(interaction.options.get('prove',true).attachment?.url)
        const bbq = String(interaction.options.get('bounty',true).value)
        const mentions = interaction.options.get('mentions')?.value
        const npc = Boolean(interaction.options.get('npc',true).value)
        const ch = await client.channels.fetch(process.env.SUBMIT_CHANNEL)
        if (mentions == null){
            const checked = await Scheck(interaction.user.id,bbq).catch(e=>{
                interaction.reply("There is some problem connecting to server, please try again after some minutes")
            })
            if(!checked){return await interaction.reply({content:"you are not registered yet",ephemeral:true})}
            if(checked==='Cooldown'){return await interaction.reply({content:"BBQ on Cooldown",ephemeral:true})} else
            if(checked === 'overheat'){return await interaction.reply({content:"you are still on cooldown",ephemeral:true})}
            interaction.deferReply()
            try{
                let embed
                let button
                if(npc){embed = Nembed(checked.cname,interaction.user.username,attachment,bbq,interaction.user.displayAvatarURL());button = B_build(await Submitted(1,checked.cname,interaction.user.username,checked.cid,'none',interaction.user.displayAvatarURL(),attachment,bbq))}
                else{embed = Sembed(checked.cname,interaction.user.username,attachment,bbq,interaction.user.displayAvatarURL());button = B_build(await Submitted(1,checked.cname,interaction.user.username,checked.cid,'none',interaction.user.displayAvatarURL(),attachment,bbq))}
                if(!ch?.isTextBased()) return
                ch.send({embeds:[embed.embed],files:[embed.attach],components:[button]})
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("Bounty Submitted")
                const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
                if(!cd?.isTextBased()) return
                cd.send({embeds:[await Cooldown()]})
            }catch(e){
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("There is some problem connecting to server, please try again after some minutes")
            }
        }else{
            const data = String(mentions).match(/<@!?([0-9]+)>/g)
            if(data === null ){return interaction.reply({content:"No mentions Detected",ephemeral:true})}
            const ids:any[] = data.map(e=>e.match(/([0-9]+)/g))
            const checked = await Mcheck(interaction.user.id,ids,bbq).catch(e=>{
                interaction.reply("There is some problem connecting to server, please try again after some minutes")
            })
            if(!checked){return await interaction.reply("there is member thats not registered yet")}else
            if(checked==='Cooldown'){return await interaction.reply({content:"BBQ on Cooldown",ephemeral:true})} else
            if(checked === 'overheat'){return await interaction.reply({content:"there is member on bounty cooldown",ephemeral:false})}
            interaction.deferReply()
            try{
                let uname = checked.data
                    let chname = uname.map(e=>{
                        const name = client.users.cache.get(e)
                        if(name == null){
                           return 'none' 
                        }else{
                            return name.username
                        }
                    })
                let embed = Membed(checked.cname,chname,attachment,bbq,interaction.user.displayAvatarURL())
                let button = B_build(await Submitted(3,JSON.stringify(checked.cname),JSON.stringify(chname),0,JSON.stringify(checked.cid),interaction.user.displayAvatarURL(),attachment,bbq))
                if(!ch?.isTextBased()) return
                ch.send({embeds:[embed.embed],files:[embed.attach],components:[button]})
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("Bounty Submitted")
                const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
                if(!cd?.isTextBased()) return
                const msg1 = cd.messages.cache.get(process.env.COOLDOWN_MSG)
                msg1?.edit({embeds:[await Cooldown()]})
            }catch{
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("There is some problem connecting to server, please try again after some minutes")
            }
        }
    },
    cooldown: 10
}
export default command;