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
        console.log(mentions)
        const npc = Boolean(interaction.options.get('npc',true).value)
        const ch = await client.channels.fetch(process.env.SUBMIT_CHANNEL)
        if (mentions == null){
            console.log('in')
            const checked = await Scheck(interaction.user.id,bbq)
            if(!checked){return interaction.reply({content:"you are not registered yet",ephemeral:true})}
            if(checked==='Cooldown'){return interaction.reply({content:"BBQ on Cooldown",ephemeral:true})} else
            if(checked === 'overheat'){return interaction.reply({content:"you are still on cooldown",ephemeral:true})}
            interaction.reply("Bounty Submitted")
            let embed
            let button
            if(npc){embed = Nembed(String(checked[1]),interaction.user.username,attachment,bbq,interaction.user.displayAvatarURL());button = B_build(await Submitted(1,String(checked[1]),interaction.user.username,Number(checked[0]),'none',interaction.user.displayAvatarURL(),attachment,bbq))}
            else{embed = Sembed(String(checked[1]),interaction.user.username,attachment,bbq,interaction.user.displayAvatarURL());button = B_build(await Submitted(1,String(checked[1]),interaction.user.username,Number(checked[0]),'none',interaction.user.displayAvatarURL(),attachment,bbq))}
            if(!ch?.isTextBased()) return
            ch.send({embeds:[embed.embed],files:[embed.attach],components:[button]})
            const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
            if(!cd?.isTextBased()) return
            ch.send({embeds:[await Cooldown()]})
        }else{
            const data = String(mentions).match(/<@!?([0-9]+)>/g)
            if(data === null ){return interaction.reply({content:"No mentions Detected",ephemeral:true})}
            const ids:any[] = data.map(e=>e.match(/([0-9]+)/g))
            const checked = await Mcheck(interaction.user.id,ids,bbq)
            if(!checked){return interaction.reply("there is member thats not registered yet")}else
            if(checked==='Cooldown'){return interaction.reply({content:"BBQ on Cooldown",ephemeral:true})} else
            if(checked === 'overheat'){return interaction.reply({content:"there is member on bounty cooldown",ephemeral:false})}
            interaction.reply("Bounty Submitted")
            let uname = [interaction.user.id]
            for(let i=0;i<ids.length;i++){
                const wtf = (await client.users.fetch(ids[i])).username
                uname.push(wtf)
            }
            let embed = Membed(checked[1],uname,attachment,bbq,interaction.user.displayAvatarURL())
            let button = B_build(await Submitted(3,JSON.stringify(checked[1]),JSON.stringify(uname),0,JSON.stringify(checked[0]),interaction.user.displayAvatarURL(),attachment,bbq))
            if(!ch?.isTextBased()) return
            ch.send({embeds:[embed.embed],files:[embed.attach],components:[button]})
            const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
            if(!cd?.isTextBased()) return
            ch.send({embeds:[await Cooldown()]})
        }
    },
    cooldown: 10
}
export default command;