import { ContextMenuCommandBuilder,ApplicationCommandType } from "discord.js";
import { ContextMenu } from "../types";
import Embed from '../lib/gacha/embed'

const command:ContextMenu = {
    command: new ContextMenuCommandBuilder()
    .setName("Event")
    .setType(ApplicationCommandType.User),
    execute: async interaction =>{
        if (!interaction.isUserContextMenuCommand()) return;
        const uid = interaction.targetUser
        const disc = await Embed(uid.id)
        if (!disc) {return interaction.reply({content:`${uid} arent registered yet\nright-click on your profile if what you mean is your own information`,allowedMentions:{parse:[]}})}
        disc.setFooter({ text: `owned by ${uid.username}`, iconURL: `${uid.displayAvatarURL()}` })
        interaction.reply({embeds:[disc]})
    }
}
export default command