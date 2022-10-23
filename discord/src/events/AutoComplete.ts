import { Interaction } from "discord.js";
import { BotEvent } from "../types";
import Glist from '../lib/guildlist'
import client from '../index'


var ggd: any;
(async ()=>{
    ggd = await Glist()
})();
const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return;
        switch (interaction.commandName){
            case 'join_guild':{
                const focusedValue = interaction.options.getFocused().toLocaleLowerCase();
                console.log(focusedValue)
                let filtered = ggd.filter((c:any)=>{
                    if (c.toLocaleLowerCase().startsWith(focusedValue)){return c}
                })
                console.log(filtered)
                filtered = filtered.slice(0,10)
                await interaction.respond(filtered.map((c:any)=>({name:c,value:c})),).catch(e=>console.log(e));
                break
            }
        }
        
    }}

export default event