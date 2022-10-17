import { Client, GatewayIntentBits, Collection, PermissionFlagsBits, AttachmentBuilder,} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import get_save from './lib/savefile'

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
        if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch(e=>console.log(e));return}
        switch (interaction.customId){
            case "primary":{interaction.reply("hello").catch(e=>console.log(e));await interaction.message.delete().catch(e=>console.log(e))}
            case "nothing":{await interaction.message.delete().catch(e=>console.log(e));await interaction.reply({content:"understanable have a nice day",ephemeral:true}).catch(e=>console.log(e))}
            case "save":{await interaction.reply({content:"check your DM",ephemeral:true});await interaction.user.send(({files:[{attachment: await get_save(interaction.user.id),name:"pleasework.bin"}]})).catch(async (e)=>await interaction.reply({content:"Error while sending DM\nMake sure direct message is enabled",ephemeral:true}))}
    }}
});
client.login(process.env.TOKEN)