import { BotEvent } from "../types";
import get_save from '../lib/savefile'
import trans from '../lib/transmog'
import Boost_off from '../lib/boost_off'
import Boost_on from '../lib/boost_on'
import {Accept} from '../lib/bounty/accepted'
import Rejected from '../lib/bounty/rejected'
import Cooldown from '../lib/bounty/cooldown'
import Leaderboard from '../lib/bounty/leaderboard'
import {Sembed,Nembed,Membed} from '../lib/bounty/embed'
import client from "../index";
import getBuff from "../lib/urlbuf";
import { AttachmentBuilder, EmbedBuilder, GuildMember, Interaction } from "discord.js";
const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction:Interaction) => {
        if (interaction.isButton()){
            if(interaction.customId.includes('approve')){
                const expert =await interaction.guild?.roles.fetch(process.env.EXPERT_ROLE)
                const master = await interaction.guild?.roles.fetch(process.env.MASTER_ROLE)
                const champion = await interaction.guild?.roles.fetch(process.env.CHAMPION_ROLE)
                const road = await interaction.guild?.roles.fetch(process.env.ROAD_ROLE)
                const demolizer = await interaction.guild?.roles.fetch(process.env.DEMOLIZER_ROLE)
                if (demolizer==null || road==null ||champion==null ||master==null ||expert==null)return
                const addRole = async (user:GuildMember|undefined,power:string) => {
                    if (power == 'expert'){await user?.roles.add(expert);return {color:0xB87333,bonus:"10%"}}else
                        if (power == 'master'){await user?.roles.add(master);return {color:0xC0C0C0,bonus:"20%"}}else
                        if (power == 'champion'){await user?.roles.add(champion);return {color:0xFFD700,bonus:"30%"}}else
                        if (power == 'road'){await user?.roles.add(road);return {color:0x338856,bonus:"40%"}}else
                        {await  user?.roles.add(demolizer);return {color:0x000088,bonus:"50%"}}
                }
                const id = Number(interaction.customId.replace('approve',''))
                interaction.reply({content:"witing for good connection, dont press the button again in few minutes please",ephemeral:true})
                const accept = await Accept(id)
                if (!accept) {return interaction.channel?.send("there is problem on server, try again sometimes")}
                const conquer = await client.channels.fetch(process.env.CONQUER_CHANNEL)
                const leader = await client.channels.fetch(process.env.LEADERBOARD_CHANNEL)
                const rec = await client.channels.fetch(process.env.RECEPTIONIST_CHANNEL)
                const promo = await client.channels.fetch(process.env.PROMOTION_CHANNEL)
                if (!rec?.isTextBased() || !conquer?.isTextBased() || !leader?.isTextBased() || !promo?.isTextBased())return
                const msg =await leader.messages.fetch(process.env.LEADERBOARD_MSG)
                if(accept.type==1){
                    if (accept.result instanceof Array) return
                    rec.send(`<@${accept.result.uid}> Bounty are Accepted by ${interaction.user.username}`)
                    if (accept.result.status===0){rec.send(`<@${accept.result.uid}> Reward already distributed`)}else{rec.send(`<@${accept.result?.uid}> Coordinate with Eve to rechieve Reward`)}
                    const embed = Sembed(accept.cname,accept.uname,accept.url,accept.bbq,accept.avatar)
                    conquer.send({embeds:[embed.embed],files:[embed.attach]})
                    if (accept.result?.title !== 'norm'){
                        const user = await interaction.guild?.members.fetch(String(accept.result?.uid))
                        const bonus = await addRole(user,accept.result.title)
                        const wtf = await getBuff(`${process.env.NEXTAUTH_URL}/api/og/${accept.result.title}?avatar=${user?.displayAvatarURL({extension:'png'})}`)
                        const att = new AttachmentBuilder(wtf,{name:'og.png'})
                        const embed = new EmbedBuilder()
                            .setTitle("Congratulation on Promotion")
                            .setColor(bonus.color)
                            .setDescription(`Now you got bonus ${bonus.bonus} bounty point for every bounty cleared, except you have higher title`)
                            .setImage("attachment://og.png")
                        const msg = await promo.send({content:`congratulation on promotion ${user}`,files:[att],embeds:[embed]})
                        msg.react('🥳')
                        msg.crosspost().catch(console.error);
                    }
                }else if (accept.type==2){
                    if (accept.result instanceof Array) return
                    rec.send(`<@${accept.result.uid}> Bounty are Accepted by ${interaction.user.username}`)
                    if (accept.result.status==0){rec.send(`<@${accept.result.uid}> Reward already distributed`)}else{rec.send(`<@${accept.result.uid}> Coordinate with Eve to rechieve Reward`)}
                    const embed = Nembed(accept.cname,accept.uname,accept.url,accept.bbq,accept.avatar)
                    conquer.send({embeds:[embed.embed],files:[embed.attach]})
                    if (accept.result.title !== 'norm'){
                        const user = await interaction.guild?.members.fetch(String(accept.result?.uid))
                        const bonus = await addRole(user,accept.result.title)
                        const wtf = await getBuff(`${process.env.NEXTAUTH_URL}/api/og/${accept.result.title}?avatar=${user?.displayAvatarURL({extension:'png'})}`)
                        const att = new AttachmentBuilder(wtf,{name:'og.png'})
                        const embed = new EmbedBuilder()
                            .setTitle("Congratulation on Promotion")
                            .setColor(bonus.color)
                            .setDescription(`Now you got bonus ${bonus.bonus} bounty point for every bounty cleared, except you have higher title`)
                            .setImage("attachment://og.png")
                        const msg = await promo.send({content:`congratulation on promotion ${user}`,files:[att],embeds:[embed]})
                        msg.react('🥳')
                        msg.crosspost().catch(console.error);
                    }
                }else{
                    if (!(accept.result instanceof Array)) return
                    rec.send(`<@${accept.result[0].uid}> Bounty are Accepted by ${interaction.user.username}`)
                    for (let i=0;i<accept.result.length;i++){
                        if (accept.result[i].status==0){rec.send(`<@${accept.result[i].uid}> Reward already distributed`)}else{rec.send(`<@${accept.result[i].uid}> Coordinate with Eve to rechieve Reward`)}
                        if (accept.result[i].title !== 'norm'){
                            const user = await interaction.guild?.members.fetch(String(accept.result[i]?.uid))
                            const bonus = await addRole(user,accept.result[i].title)
                            const wtf = await getBuff(`${process.env.NEXTAUTH_URL}/api/og/${accept.result[i].title}?avatar=${user?.displayAvatarURL({extension:'png'})}`)
                            const att = new AttachmentBuilder(wtf,{name:'og.png'})
                            const embed = new EmbedBuilder()
                            .setTitle("Congratulation on Promotion")
                            .setColor(bonus.color)
                            .setDescription(`Now you got bonus ${bonus.bonus} bounty point for every bounty cleared, except you have higher title`)
                            .setImage("attachment://og.png")
                            const msg = await promo.send({content:`congratulation on promotion ${user}`,files:[att],embeds:[embed]})
                            msg.react('🥳')
                            msg.crosspost().catch(console.error);
                        }
                    }
                    const embed = Membed(JSON.parse(accept.cname),JSON.parse(accept.uname),accept.url,accept.bbq,accept.avatar)
                    const msg1 =await conquer.send({embeds:[embed.embed],files:[embed.attach]})
                    msg1.crosspost().catch(console.error)
                }
                await interaction.message.delete()
                const lead = await Leaderboard()
                msg?.edit({embeds:[lead.embed]})
            }else if(interaction.customId.includes('nope')){
                const id = Number(interaction.customId.replace('nope',''))
                interaction.reply({content:"witing for good connection, dont press the button again in few minutes please",ephemeral:true})
                const rej = await Rejected(id)
                const rec = await client.channels.fetch(process.env.RECEPTIONIST_CHANNEL)
                if (!rec?.isTextBased())return
                await interaction.message.delete()
                const cd = await client.channels.fetch(process.env.COOLDOWN_CHANNEL)
                if (!cd?.isTextBased())return
                const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG)
                msg1?.edit({embeds:[await Cooldown()]})
                rec.send(`<@${rej}> Bounty are Rejected by ${interaction.user.username}`)
            }
            switch (interaction.customId){
                case "nothing":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"understanable have a nice day",ephemeral:true}).catch((e:any)=>console.log(e));await interaction.message.delete().catch((e:any)=>console.log(e));break}
                case "save":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"check your DM",ephemeral:true});(await get_save(interaction.user.id)).map(async (e:any) => (e !== "nothing") && await interaction.user.send({ files: [{ attachment: e[0],name:e[1] }] }).catch((e:any)=>console.log(e)));break}
                case "transmog":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"unlocked your transmog",ephemeral:true});await trans(interaction.user.id);break}
                case "boost_on":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};const boost = await Boost_on(interaction.user.id);boost[0]?interaction.reply({content:"Turn On Your Login Boost",ephemeral:true}):interaction.reply({content:`cooldown till <t:${boost[1]}:R>`,ephemeral:true});break}
                case "boost_off":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await Boost_off(interaction.user.id);await interaction.reply({content:"Turn Off Your Login Boost",ephemeral:true});break}
                case "member":{
                    const role = await interaction.guild?.roles.fetch(process.env.MEMBER_ROLE)
                    const member = await interaction.guild?.members.fetch(interaction.user.id)
                    if (role==null) return
                    await member?.roles.add(role)
                    interaction.reply({content:"Congrats you got member role now",ephemeral:true})
                    break
                }
        }}
    }
}
export default event