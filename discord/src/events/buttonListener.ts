import { Interaction } from "discord.js";
import { BotEvent } from "../types";
import get_save from '../lib/savefile'
import trans from '../lib/transmog'
import Boost_off from '../lib/boost_off'
import Boost_on from '../lib/boost_on'
import Bind from '../lib/bind'

const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (interaction.isButton()){
            if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch(e=>console.log(e));return}
            switch (interaction.customId){
                case "nothing":{await interaction.reply({content:"understanable have a nice day",ephemeral:true}).catch(e=>console.log(e));break}
                case "save":{await interaction.reply({content:"check your DM",ephemeral:true});(await get_save(interaction.user.id)).map(async (e:any) => (e !== "nothing") && await interaction.user.send({ files: [{ attachment: e[0],name:e[1] }] }).catch(e=>console.log(e)));break}
                case "transmog":{await interaction.reply({content:"unlocked your transmog",ephemeral:true});await trans(interaction.user.id);break}
                case "boost_on":{const boost = await Boost_on(interaction.user.id);boost[0]?interaction.reply({content:"Turn On Your Login Boost",ephemeral:true}):interaction.reply({content:`cooldown till <t:${boost[1]}:R>`,ephemeral:true});break}
                case "boost_off":{await Boost_off(interaction.user.id);await interaction.reply({content:"Turn Off Your Login Boost",ephemeral:true});break}
        }}

    }
}
export default event