import { BotEvent } from "../types";
import get_save from '../lib/savefile'
import trans from '../lib/transmog'
import Boost_off from '../lib/boost_off'
import Boost_on from '../lib/boost_on'
import Bind from '../lib/bind'
import {Accept} from '../lib/bounty/accepted'
import Rejected from '../lib/bounty/rejected'
import Cooldown from '../lib/bounty/cooldown'
import Leaderboard from '../lib/bounty/leaderboard'
import {Sembed,Nembed,Membed} from '../lib/bounty/embed'
import client from "../index";
import getBuff from "../lib/urlbuf";
import { AttachmentBuilder } from "discord.js";

const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction:any) => {
        if (interaction.isButton()){
            if (interaction.customId.includes('malele')){
                if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return}
                const cid = Number(interaction.customId.replace('malele',''));
                Bind(interaction.user.id,cid,true)
                interaction.reply({content:"congrats you have registered now",ephemeral:true})
                const role =await interaction.guild?.roles.fetch(process.env.REGISTERED_ROLE)
                await interaction.member?.roles.add(role)
                return
            }else if (interaction.customId.includes('female')){
                if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return}
                const cid = Number(interaction.customId.replace('female',''));
                Bind(interaction.user.id,cid,false)
                interaction.reply({content:"congrats you have registered now",ephemeral:true})
                const role =await interaction.guild?.roles.fetch(process.env.REGISTERED_ROLE)
                await interaction.member?.roles.add(role)
            }else if(interaction.customId.includes('approve')){
                const id = Number(interaction.customId.replace('approve',''))
                interaction.deferReply()
                const accept = await Accept(id)
                if (!accept) {return interaction.editReply("there is problem on server, try again sometimes")}
                const conquer = await client.channels.fetch(process.env.CONQUER_CHANNEL)
                const leader = await client.channels.fetch(process.env.LEADERBOARD_CHANNEL)
                const log = await client.channels.fetch(process.env.BOUNTY_LOG_CHANNEL)
                const rec = await client.channels.fetch(process.env.RECEPTIONIST_CHANNEL)
                const promo = await client.channels.fetch(process.env.PROMOTION_CHANNEL)
                if (!rec?.isTextBased())return
                if (!conquer?.isTextBased())return
                if (!leader?.isTextBased())return
                if (!log?.isTextBased())return
                if (!promo?.isTextBased())return
                if(accept.type==1){
                    rec.send(`<@${accept.result[2]}> Bounty are Accepted by ${interaction.user.username}`)
                    if (accept.result[1]==0){rec.send(`<@${accept.result[2]}> Reward already distributed`)}else{`<@${accept.result[2]}> Coordinate with Eve to rechieve Reward`}
                    const embed = Sembed(accept.cname,accept.uname,accept.url,accept.bbq,accept.avatar)
                    conquer.send({embeds:[embed.embed],files:[embed.attach]})
                    if (accept.result[0] !== 'norm'){
                        const user = await client.users.fetch(accept.result[2])
                        const wtf = await getBuff(`http://localhost:8080/api/og/${accept.result[0]}?avatar=${user.displayAvatarURL({extension:'png'})}`)
                        const att = new AttachmentBuilder(wtf,{name:'og.png'})
                        const msg = await promo.send({content:`congratulation on promotion ${user}`,files:[att]})
                        msg.react('🥳')
                    }
                }else if (accept.type==1){
                    rec.send(`<@${accept.result[2]}> Bounty are Accepted by ${interaction.user.username}`)
                    if (accept.result[1]==0){rec.send(`<@${accept.result[2]}> Reward already distributed`)}else{`<@${accept.result[2]}> Coordinate with Eve to rechieve Reward`}
                    const embed = Nembed(accept.cname,accept.uname,accept.url,accept.bbq,accept.avatar)
                    conquer.send({embeds:[embed.embed],files:[embed.attach]})
                    if (accept.result[0] !== 'norm'){
                        const user = await client.users.fetch(accept.result[2])
                        const wtf = await getBuff(`http://localhost:8080/api/og/${accept.result[0]}?avatar=${user.displayAvatarURL({extension:'png'})}`)
                        const att = new AttachmentBuilder(wtf,{name:'og.png'})
                        const msg = await promo.send({content:`congratulation on promotion ${user}`,files:[att]})
                        msg.react('🥳')
                    }
                }else{
                    rec.send(`<@${accept.result[2][0]}> Bounty are Accepted by ${interaction.user.username}`)
                    for (let i=0;i<accept.result[0].length;i++){
                        if (accept.result[1][i]==0){rec.send(`<@${accept.result[2][i]}> Reward already distributed`)}else{`<@${accept.result[2][i]}> Coordinate with Eve to rechieve Reward`}
                        if (accept.result[0][i] !== 'norm'){
                            const user = await client.users.fetch(accept.result[2][i])
                            const wtf = await getBuff(`http://localhost:8080/api/og/${accept.result[0][i]}?avatar=${user.displayAvatarURL({extension:'png'})}`)
                            const att = new AttachmentBuilder(wtf,{name:'og.png'})
                            const msg = await promo.send({content:`congratulation on promotion ${user}`,files:[att]})
                            msg.react('🥳')
                        }
                    }
                    const embed = Membed(JSON.parse(accept.cname),JSON.parse(accept.uname),accept.url,accept.bbq,accept.avatar)
                    conquer.send({embeds:[embed.embed],files:[embed.attach]})
                }
                const lead = await Leaderboard()
                leader.send({embeds:[lead.embed]})
                log.send(lead.leg)
            }else if(interaction.customId.includes('nope')){
                const id = Number(interaction.customId.replace('nope',''))
                const rej = await Rejected(id)
                const rec = await client.channels.fetch(process.env.RECEPTIONIST_CHANNEL)
                if (!rec?.isTextBased())return
                const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
                if (!cd?.isTextBased())return
                rec.send(`<@${rej}> Bounty are ARejected by ${interaction.user.username}`)
                cd.send({embeds:[await Cooldown()]})
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