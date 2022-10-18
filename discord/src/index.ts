import { Client, GatewayIntentBits, Collection, Channel} from "discord.js";
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

// Caught Unhandled Errors
process.on('unhandledRejection', async (error) => {
    const ch = client.channels.cache.get(String(process.env.EROR_LOG_CHANNEL))
    if (ch?.isTextBased()){ch.send(String(error))}
    console.error('unhandledRejection', error);
});
client.login(process.env.TOKEN)
export default client