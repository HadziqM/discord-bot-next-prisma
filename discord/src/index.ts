import { Client, GatewayIntentBits, Collection, PermissionFlagsBits,} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
config()

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
})
client.on('interactionCreate', async interaction => {
    if (interaction.isButton()){
    switch (interaction.customId){
        case "primary":{interaction.reply("hello").catch(e=>console.log(e));await interaction.message.delete().catch(e=>console.log(e))}
        case "secondary":{await interaction.message.delete().catch(e=>console.log(e))}
    }}
});
client.login(process.env.TOKEN)