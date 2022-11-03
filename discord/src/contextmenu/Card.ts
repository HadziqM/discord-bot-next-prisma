import { ContextMenuCommandBuilder,ApplicationCommandType } from "discord.js";
import { ContextMenu } from "../types";
import client from '../index'
import Check from '../lib/registercheck'
import Embed from '../lib/char_embbed'

const command:ContextMenu = {
    command: new ContextMenuCommandBuilder()
    .setName("Card")
    .setType(ApplicationCommandType.User),
    execute: async interaction =>{
        if (!interaction.isUserContextMenuCommand()) return;
        const uid = interaction.targetId
        const disc = await Check(uid)
        if (!disc) {return interaction.reply({content:`<@${uid}> arent registered yet\nright-click on your profile if what you mean is your own information`,allowedMentions:{parse:[]}})}
        let embed = await Embed(disc)
        if (!embed) return interaction.reply({content:"error while connecting on server",ephemeral:true})
        const user = await client.users.fetch(uid)
        embed[0].setFooter({ text: `owned by ${user.username}`, iconURL: `${user.displayAvatarURL()}` })
        interaction.reply({embeds:[embed[0]],files:[embed[1]]})
    }
}
export default command 