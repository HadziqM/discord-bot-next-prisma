import { ContextMenuCommandBuilder,ApplicationCommandType } from "discord.js";
import { ContextMenu } from "../types";
import client from '../index'
import Check from '../lib/registercheck'
import Boost from '../lib/boost'

const command:ContextMenu = {
    command: new ContextMenuCommandBuilder()
    .setName("Boost")
    .setType(ApplicationCommandType.User),
    execute: async interaction =>{
        if (!interaction.isUserContextMenuCommand()) return;
        const uid = interaction.targetId
        const disc = await Check(uid)
        if (!disc) {return interaction.reply("They arent registered yet")}
        let embed = await Boost(disc)
        const user = await client.users.fetch(uid)
        embed.setFooter({ text: `owned by ${user.username}`, iconURL: `${user.displayAvatarURL()}` });
        interaction.reply({embeds:[embed]})
    }
}
export default command 