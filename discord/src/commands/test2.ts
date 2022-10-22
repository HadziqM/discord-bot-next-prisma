import { PermissionFlagsBits,EmbedBuilder } from "discord.js";
import { Command } from "../types";
import { readFileSync } from "fs";

const command : Command = {
    name: "test",
    execute: async (message, args) => {
        const raw = JSON.stringify(["asdasdsa","sdasdas","asdasdsad"])
        console.log(raw,typeof raw)
        const wtf =  JSON.parse(String(raw))
        console.log(wtf,typeof wtf)
        message.channel.send(wtf[0])
        message.channel.send(raw)
    },
    cooldown: 10,
    aliases: ["sayerror"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command


