import { BotEvent } from "../types";
import get_save from '../lib/savefile'
import trans from '../lib/transmog'
import Boost_off from '../lib/boost_off'
import Boost_on from '../lib/boost_on'
import Bind from '../lib/bind'

const registered = process.env.REGISTERED_ROLE
const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction) => {
        if (interaction.isButton()){
            if (interaction.customId.includes('malele')){
                if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return}
                const cid = Number(interaction.customId.replace('malele',''));
                Bind(interaction.user.id,cid,true)
                interaction.reply({content:"congrats you have registered now",ephemeral:true})
                const role = interaction.guild?.roles.cache.find((r:any) => r.id === String(registered))
                await interaction.member.roles.add(role)
                return
            }else if (interaction.customId.includes('female')){
                if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return}
                const cid = Number(interaction.customId.replace('female',''));
                Bind(interaction.user.id,cid,false)
                interaction.reply({content:"congrats you have registered now",ephemeral:true})
                const role = interaction.guild?.roles.cache.find((r:any) => r.id === String(registered))
                await interaction.member.roles.add(role)
                return
            }
            switch (interaction.customId){
                case "nothing":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"understanable have a nice day",ephemeral:true}).catch((e:any)=>console.log(e));break}
                case "save":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"check your DM",ephemeral:true});(await get_save(interaction.user.id)).map(async (e:any) => (e !== "nothing") && await interaction.user.send({ files: [{ attachment: e[0],name:e[1] }] }).catch((e:any)=>console.log(e)));break}
                case "transmog":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"unlocked your transmog",ephemeral:true});await trans(interaction.user.id);break}
                case "boost_on":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};const boost = await Boost_on(interaction.user.id);boost[0]?interaction.reply({content:"Turn On Your Login Boost",ephemeral:true}):interaction.reply({content:`cooldown till <t:${boost[1]}:R>`,ephemeral:true});break}
                case "boost_off":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await Boost_off(interaction.user.id);await interaction.reply({content:"Turn Off Your Login Boost",ephemeral:true});break}
        }}
    }
}
export default event