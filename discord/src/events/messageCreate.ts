import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, Message } from "discord.js";
import client from "../index";
import { checkPermissions, sendTimedMessage } from "../functions";
import { BotEvent } from "../types";

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


const event: BotEvent = {
    name: "messageCreate",
    execute: (message: Message) => {
        if (!message.member || message.member.user.bot) return;
        if (!message.guild) return;
        if (message.content.toLowerCase().includes("how to") || message.content.toLowerCase().includes("how do i")){
            const embed = new EmbedBuilder()
                .setTitle("Gude Channel")
                .setDescription("Is there something i could help?, we have prepared channel that might be help to you")
                .addFields(
                    {name:"Bot Help Channel",value:`<#${process.env.NEWS_CHANNEL}> `+"This channel have information on how to use bot and also have a list of bot command"},
                    {name:"Game Guide",value:`<#${process.env.GAME_CHANNEL}> `+"This channel have general information about monster hunter frontier game provided by player, there might be guide that you seek"}
                )
                .setColor('Random')
                .setFooter({text:"I m sincerely sorry if this not what you after",iconURL:client.user?.displayAvatarURL()})

            message.reply({embeds:[embed],components:[button]})
        }
        let prefix = process.env.PREFIX
        if (!message.content.startsWith(prefix)) return;
        if (message.channel.type !== ChannelType.GuildText) return;

        let args = message.content.substring(prefix.length).split(" ")
        let command = message.client.commands.get(args[0])

        if (!command) {
            let commandFromAlias = message.client.commands.find((command) => command.aliases.includes(args[0]))
            if (commandFromAlias) command = commandFromAlias
            else return;
        }

        let cooldown = message.client.cooldowns.get(`${command.name}-${message.member.user.username}`)
        let neededPermissions = checkPermissions(message.member, command.permissions)
        if (neededPermissions !== null)
            return sendTimedMessage(
                `
            You don't have enough permissions to use this command. 
            \n Needed permissions: ${neededPermissions.join(", ")}
            `,
                message.channel,
                5000
            )


        if (command.cooldown && cooldown) {
            if (Date.now() < cooldown) {
                sendTimedMessage(
                    `You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`,
                    message.channel,
                    5000
                )
                return
            }
            message.client.cooldowns.set(`${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
            setTimeout(() => {
                message.client.cooldowns.delete(`${command?.name}-${message.member?.user.username}`)
            }, command.cooldown * 1000)
        } else if (command.cooldown && !cooldown) {
            message.client.cooldowns.set(`${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
        }
        command.execute(message, args)
    }
}

export default event