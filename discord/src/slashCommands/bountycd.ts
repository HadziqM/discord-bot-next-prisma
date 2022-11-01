import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
import {Bcd} from '../lib/cooldown'
import Cooldown from '../lib/bounty/cooldown'
import client from '../index'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("cooldown")
    .setDescription("change bounty cd")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
        {name:'SP',value:'SP'}))
        .addNumberOption(o => o.setName('value').setDescription('value of cd need to be changed').setRequired(true)),
    execute: async interaction => {
        const bbq = String(interaction.options.get("bounty")?.value)
        const type = Number(interaction.options.get("value")?.value)
        const res = await Bcd(bbq,type)
        if(!res){return interaction.reply({content:'error while connecting to server',ephemeral:true})}
        interaction.reply('success')
        const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
        if (!cd?.isTextBased())return
        interaction.reply({ephemeral:true,content:`${bbq}'s cooldown successfully changed to ${type}`})
        const msg1 = cd.messages.cache.get(process.env.COOLDOWN_MSG)
        msg1?.edit({embeds:[await Cooldown()]})
    },
    cooldown: 10
}

export default command