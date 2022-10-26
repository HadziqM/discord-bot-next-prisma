import { PrismaClient } from "@prisma/client";
import {  SlashCommandBuilder} from "discord.js"
import client from "..";
import { SlashCommand } from "../types";

const prisma = new PrismaClient()

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ch_id")
    .setDescription("show your hunter status")
    .addIntegerOption(o=> o.setName('cid').setDescription('Charachter id').setRequired(true))
    ,
    execute: async (interaction) => {
        const id = Number(interaction.options.get('cid')?.value)
        const lib = await prisma.discord.findFirst({where:{char_id:id},select:{discord_id:true}}) ?? "not registered"
        const user = lib==="not registered" ? lib : await client.users.fetch(lib.discord_id)
        interaction.reply({content:`Its belong to ${user}`}).catch((e)=> console.log(e))
        await prisma.$disconnect()
    },
    cooldown: 10
}
export default command