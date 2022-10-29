import { ContextMenuCommandBuilder,ApplicationCommandType } from "discord.js";
import { ContextMenu } from "../types";
import Check from '../lib/registercheck'
import Boost from '../lib/boost'

const command:ContextMenu = {
    command: new ContextMenuCommandBuilder()
    .setName("Boost")
    .setType(ApplicationCommandType.User),
    execute: async interaction =>{
        if (!interaction.isUserContextMenuCommand()) return;
        const uid = interaction.targetUser
        const disc = await Check(uid.id)
        if (!disc) {return interaction.reply("They arent registered yet")}
        let embed = await Boost(disc)
        embed.setFooter({ text: `owned by ${uid.username}`, iconURL: `${uid.displayAvatarURL()}` });
        interaction.reply({embeds:[embed]})
    }
}
export default command 