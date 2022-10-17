import { Client, GatewayIntentBits, Collection, PermissionFlagsBits, AttachmentBuilder,} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import get_save from './lib/savefile'
import trans from './lib/transmog'

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
            case "nothing":{await interaction.message.delete().catch(e=>console.log(e));await interaction.reply({content:"understanable have a nice day",ephemeral:true}).catch(e=>console.log(e));break}
            case "save":{await interaction.reply({content:"check your DM",ephemeral:true});(await get_save(interaction.user.id)).map(async (e:any) => (e !== "nothing") && await interaction.user.send({ files: [{ attachment: e[0],name:e[1] }] }).catch(e=>console.log(e)));break}
            case "transmog":{await interaction.reply({content:"unlocked your transmog",ephemeral:true});await trans(interaction.user.id);break}
    }}
});
client.login(process.env.TOKEN)