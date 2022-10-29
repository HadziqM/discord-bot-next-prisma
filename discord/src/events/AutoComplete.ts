import { Interaction } from "discord.js";
import { readFileSync } from "fs";
import { BotEvent } from "../types";

const raw = readFileSync('./prerender_data/guild_data.json')
const data =  JSON.parse(String(raw))
const list  = data.guild.map((e:any)=> e.name)



const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return;
        switch (interaction.commandName){
            case 'join_guild':{
                const focusedValue = interaction.options.getFocused().toLocaleLowerCase();
                console.log(focusedValue)
                let filtered
                try{
                    filtered = list.filter((c:any)=>{if(c.toLocaleLowerCase().startsWith(focusedValue)){return c}})
                }catch(e){
                    console.log(e)
                }
                filtered = filtered.slice(0,10)
                await interaction.respond(filtered.map((c:any)=>({name:c,value:c}))).catch(e=>console.log(e));
                break
            }
        }
        
    }}

export default event