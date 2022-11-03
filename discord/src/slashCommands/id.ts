import {  SlashCommandBuilder} from "discord.js"
import { SlashCommand } from "../types";
import Embed from '../lib/char_embbed'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("id")
    .setDescription("show your hunter status")
    .addIntegerOption(o=> o.setName('cid').setDescription('Charachter id').setRequired(true))
    ,
    execute: async (interaction) => {
        const id = Number(interaction.options.get('cid')?.value)
        let lib = await Embed(id)
        if(!lib)return interaction.reply({content:"failed to connect database",ephemeral:true})
        interaction.reply({
            embeds: [lib[0]],files: [lib[1]]
        }).catch((e)=> console.log(e))
    },
    cooldown: 10
}
export default command