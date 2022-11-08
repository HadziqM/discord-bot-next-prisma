import { PrismaClient } from "@prisma/client";
import {  SlashCommandBuilder} from "discord.js"
import client from "..";
import { SlashCommand } from "../types";

const prisma = new PrismaClient()

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ck_id")
    .setDMPermission(false)
    .setDescription("show your hunter status")
    .addIntegerOption(o=> o.setName('cid').setDescription('Charachter id').setRequired(true))
    ,
    execute: async (interaction) => {
        if(interaction.guild?.id !== "937230168223789066") return interaction.reply({content:"you can only use this on rain server as admin there",ephemeral:true})
        const id = Number(interaction.options.get('cid')?.value)
        const lib = await prisma.discord.findFirst({where:{char_id:id},select:{discord_id:true}}) ?? "not registered"
        const user = lib==="not registered" ? lib : await client.users.fetch(lib.discord_id)
        interaction.reply({content:`Its belong to ${user}`}).catch((e)=> console.log(e))
        await prisma.$disconnect()
    },
    cooldown: 10
}
export default command