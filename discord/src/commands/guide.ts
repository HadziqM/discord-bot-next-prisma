import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import client from ".."
import { Command } from "../types"

const button = new ActionRowBuilder<ButtonBuilder>()
.addComponents( new ButtonBuilder()
    .setLabel("Go to Guide Channel")
    .setURL(process.env.GAME_URL)
    .setStyle(ButtonStyle.Link)
    )
    .addComponents( new ButtonBuilder()
    .setLabel("Go to Server News Channel")
    .setStyle(ButtonStyle.Link)
    .setURL(process.env.NEWS_URL))
            
const command : Command = {
    name: "guide",
    execute: async (message, args) => {
        const embed = new EmbedBuilder()
                .setTitle("Gude Channel")
                .setDescription("Is there something i could help?, we have prepared channel that might be help to you")
                .addFields(
                    {name:"Bot Help Channel",value:`<#${process.env.NEWS_CHANNEL}> `+"This channel have information on how to use bot and also have a list of bot command"},
                    {name:"Game Guide",value:`<#${process.env.GAME_CHANNEL}> `+"This channel have general information about monster hunter frontier game provided by player, there might be guide that you seek"}
                )
                .setColor('Random')
                .setFooter({text:"I m sincerely sorry if this not what you after",iconURL:client.user?.displayAvatarURL()})
        const oke = message.reference?.messageId
        if (oke == null) return message.channel.send({embeds:[embed],components:[button]})
        const msg = message.channel.messages.cache.get(oke)
        await msg?.reply({embeds:[embed],components:[button]})

    },
    cooldown: 10,
    aliases: ["thisGuide"],
    permissions: []
}

export default command          