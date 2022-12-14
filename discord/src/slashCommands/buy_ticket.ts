import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../types";
import Buy from '../lib/gacha/buy'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("buy_ticket")
    .setDMPermission(false)
    .setDescription("buy gacha ticket")
    .addNumberOption(o=> o.setName('value').setDescription('value need of ticket buy').setRequired(true)),
    execute: async interaction => {
        const value = Number(interaction.options.get("value")?.value)
        const res = await Buy(value,interaction.user.id)
        if(!res) return interaction.reply("youare not registered")
        if(res=="not enough") return interaction.reply("you dont have enough bounty coin to buy")
        interaction.reply("successfully bought ticket")
    },
    cooldown: 10
}

export default command