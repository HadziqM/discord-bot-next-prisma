import { Interaction } from "discord.js";
import { readFileSync } from "fs";
import { BotEvent,GuildFile } from "../types";

const raw = readFileSync('./prerender_data/guild_data.json')
const data:GuildFile =  JSON.parse(String(raw))
const list  = data.guild.map((e)=> e.name)



const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return;
        switch (interaction.commandName){
            case 'join_guild':{
                const focusedValue = interaction.options.getFocused().toLocaleLowerCase();
                let filtered:string[]
                try{
                    filtered = list.filter((c)=>{if(c.toLocaleLowerCase().startsWith(focusedValue)){return c}}).slice(0,10)
                    await interaction.respond(filtered.map((c)=>({name:c,value:c}))).catch(e=>console.log(e));
                }catch(e){
                    console.log(e)
                }
                break
            }
        }
        
    }}

export default event