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
        if (!disc) {return interaction.reply("They arent registered yet")}
        disc.setFooter({ text: `owned by ${uid.username}`, iconURL: `${uid.displayAvatarURL()}` })
        interaction.reply({embeds:[disc]})
    }
}
export default command