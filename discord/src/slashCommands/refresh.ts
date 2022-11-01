import { SlashCommandBuilder,PermissionFlagsBits} from "discord.js"
import { SlashCommand } from "../types";
import Refresh from '../lib/bounty/refresh'
import Cooldown from '../lib/bounty/cooldown'
import client from "..";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("refresh bounty cd")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        const res = await Refresh()
        if(!res) return interaction.reply({ephemeral:true,content:"error while connecting to server, try again after few minutes"})
        const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
        if (!cd?.isTextBased())return
        interaction.reply({ephemeral:true,content:"successfully refreshed"})
        const msg1 = cd.messages.cache.get(process.env.COOLDOWN_MSG)
        msg1?.edit({embeds:[await Cooldown()]})
    },
    cooldown: 10
}

export default command