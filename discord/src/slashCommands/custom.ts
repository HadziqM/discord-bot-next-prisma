import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
import Custom from '../lib/bounty/custom'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("add_ticket")
    .setDescription("add ticket to player, use negative number to substact instead")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption(o=> o.setName('methode').setDescription('methode to for the task').setRequired(true).addChoices(
        {name:'All people',value:1},
        {name:'Mentions People',value:2}))
    .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(false)),
    execute: async interaction => {
        const mentions = String(interaction.options.get("mentions")?.value)
        const methode = Number(interaction.options.get("methode")?.value)
        let ids
        if (methode===2){
            const data = mentions.match(/<@!?([0-9]+)>/g)
            if(data === null ){return interaction.reply({content:"No mentions Detected",ephemeral:true})}
            ids = data.map(e=>String(e.match(/([0-9]+)/g)))
        }else{ids=['none']}
        interaction.reply({content:'task accepted, wait for a while',ephemeral:true})
        const res = Custom(ids,methode)
        if(!res){interaction.channel?.send('failed to connect to server database')}else{interaction.channel?.send('failed to connect to server database')}
    },
    cooldown: 10
}

export default command