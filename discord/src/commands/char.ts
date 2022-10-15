import { PermissionFlagsBits,EmbedBuilder } from "discord.js";
import { Command } from "../types";
import { PrismaClient } from "@prisma/client";
import { getThemeColor } from "../functions";

const prisma = new PrismaClient();


const command : Command = {
    name: "char",
    execute: async (message, args) => {
        const id = Number(args[1])
        const discord: any = id ?  await prisma.characters.findFirst({
            where: {
              id: id,
            },
          }).catch(async (e) =>{console.log(e)}) : null;
        await prisma.$disconnect()
        message.channel.send(discord != null ? {embeds: [
            new EmbedBuilder()
            .setAuthor({name: `${discord.name}`})
            .setDescription(`gr:${discord.gr} \n hr:${discord.hrp}`)
            .setColor(getThemeColor("text"))
        ]}: "charachter not found")
    },
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command