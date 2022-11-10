import { PrismaClient } from "@prisma/client";
import { SlashCommandBuilder, PermissionFlagsBits} from "discord.js"
import { SlashCommand } from "../types";
import { fixOrder } from "../lib/joinguild";

const prisma = new PrismaClient()
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("test")
    .setDMPermission(false)
    .setDescription("dont use it")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute:async interaction => {
        await interaction.reply("ok")
        const fix = await fixOrder()
        if(!fix) return interaction.followUp("error")
        interaction.followUp("success")
    },
    cooldown: 10
}

export default command