import { PrismaClient } from "@prisma/client";
import { PermissionFlagsBits} from "discord.js";
import { writeFileSync } from "fs";
import { Command } from "../types";

const prisma = new PrismaClient()

const command : Command = {
    name: "refresh",
    execute: async (message, args) => {
        const data = await prisma.bounty.findMany({select:{title:true,cooldown:true},orderBy:{title:'asc'}})
        if (data == null)return
        const json = JSON.stringify(data,null,2)
        writeFileSync('./prerender_data/refresh.json',json)
        message.channel.send('successfully updated to server and optimized')
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command