import { BotEvent } from "../types";
import get_save from '../lib/savefile'
import trans from '../lib/transmog'
import Check from '../lib/registercheck'
import Boost_off from '../lib/boost_off'
import Boost_on from '../lib/boost_on'
import {Accept} from '../lib/bounty/accepted'
import Rejected from '../lib/bounty/rejected'
import Cooldown from '../lib/bounty/cooldown'
import Leaderboard from '../lib/bounty/leaderboard'
import {Sembed,Nembed,Membed} from '../lib/bounty/embed'
import client from "../index";
import getBuff from "../lib/urlbuf";
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, GuildMember, Interaction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import Embed from "../lib/char_embbed"
import { PrismaClient } from "@prisma/client";
import Bind from "../lib/bind";
import Decrypt from "../lib/crypto/decrypt";
import Dcheck from "../lib/registercheck";
import { CheckAcc, Write } from "../lib/reg_server/reg";
import Regis from "../lib/register";

const prisma = new PrismaClient()

const user = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(new TextInputBuilder()
        .setCustomId("username").setStyle(TextInputStyle.Short).setRequired(true).setPlaceholder("your in game username").setLabel("Username"))
const password = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(new TextInputBuilder()
        .setLabel("Password").setCustomId("password").setRequired(true).setStyle(TextInputStyle.Short).setPlaceholder("your in game password"))
const bindModal = new ModalBuilder().setCustomId('bind').setTitle('Bind Form').setComponents(user,password)
const createAcount = new ModalBuilder().setCustomId('create').setTitle('Create New Account').setComponents(user,password)
const bindButton = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(new ButtonBuilder()
        .setLabel("Bind Your Account")
        .setEmoji("🎀")
        .setCustomId("bind")
        .setStyle(ButtonStyle.Primary))
    .addComponents(new ButtonBuilder()
        .setLabel("Create New Account")
        .setEmoji("🆕")
        .setCustomId("create")
        .setStyle(ButtonStyle.Success))
const bindChannelButton = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(new ButtonBuilder()
        .setURL(process.env.BIND_URL)
        .setStyle(ButtonStyle.Link)
        .setLabel("Go to Bot Spam Channel"))
const embedTransfer = new EmbedBuilder().setTitle('🤖 How To Save Transfer').setDescription("you can save transfer to our server by using salsh command `/transfer`").setColor('Aqua').addFields({name:" 🌟 Accepted Transfer File Format 🌟",value:"```\nsavedata.bin\npartner.bin\ndecomyset.bin\nhunternavi.bin\notomoairou.bin\nplatebox.bin\nplatedata.bin\nplatemyset.bin\nrengokudata.bin\nsavemercenary.bin\nskin_hist.bin\n```"},{name:"🌟 Question Answer 🌟",value:"> :arrow_right:  Application Isn't Responded\n\nThats mean Bot isnt alive yet, try again after some minutes or report to admin to back bot up\n\n> :arrow_right:  Invalid File Format\n\nThats mean your file format, rename your file exactly same as `accepted file format`, if you think bot didnt accept correct file then report to admin\n\n> :arrow_right:  Please Dont Send Malicius File\n\nThats mean your file has potentially dangerous to server based on our filter algorithm, report to admin if you think your file is safe but still got this response"}).setImage("https://media.discordapp.net/attachments/1009291538733482055/1039409223945179176/save_transfer.gif")

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
                case "nothing":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"understanable have a nice day",ephemeral:true}).catch((e:any)=>console.log(e));await interaction.message.delete().catch((e:any)=>console.log(e));return}
                case "save":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"check your DM",ephemeral:true});(await get_save(interaction.user.id)).map(async (e:any) => (e !== "nothing") && await interaction.user.send({ files: [{ attachment: e[0],name:e[1] }] }).catch((e:any)=>console.log(e)));return}
                case "transmog":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await interaction.reply({content:"unlocked your transmog",ephemeral:true});await trans(interaction.user.id);return}
                case "boost_on":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};const boost = await Boost_on(interaction.user.id);boost[0]?interaction.reply({content:"Turn On Your Login Boost",ephemeral:true}):interaction.reply({content:`cooldown till <t:${boost[1]}:R>`,ephemeral:true});return}
                case "boost_off":{if(interaction.user.id != interaction.message.interaction?.user.id){await interaction.reply({content:"this button isnt for you",ephemeral:true}).catch((e:any)=>console.log(e));return};await Boost_off(interaction.user.id);await interaction.reply({content:"Turn Off Your Login Boost",ephemeral:true});return}
                case "save2":{
                    const res = await Check(interaction.user.id)
                    if(!res) return interaction.reply({content:"you need to bind your account to discord to be able to do this",ephemeral:true,components:[bindButton]}).catch(e=>console.log(e))
                    await interaction.reply({content:"check your DM",ephemeral:true}).catch(e=>console.log(e));
                    (await get_save(interaction.user.id)).map(async (e:any) => (e !== "nothing") && await interaction.user.send({ files: [{ attachment: e[0],name:e[1] }] }).catch((e:any)=>console.log(e)));
                    return
                }
                case "transmog2":{
                    const res = await Check(interaction.user.id)
                    if(!res) return interaction.reply({content:"you need to bind your account to discord to be able to do this",ephemeral:true,components:[bindButton]}).catch(e=>console.log(e))
                    await interaction.reply({content:"unlocked your transmog\nyou need to log out before using this, otherwise it wont work when re-login",ephemeral:true}).catch(e=>console.log(e));
                    return await trans(interaction.user.id)
                }
                case "boost_on2":{
                    const res = await Check(interaction.user.id)
                    if(!res) return interaction.reply({content:"you need to bind your account to discord to be able to do this",ephemeral:true,components:[bindButton]}).catch(e=>console.log(e))
                    const boost = await Boost_on(interaction.user.id);
                    boost[0]?interaction.reply({content:"Turn On Your Login Boost",ephemeral:true}).catch(e=>console.log(e)):interaction.reply({content:`cooldown till <t:${boost[1]}:R>`,ephemeral:true}).catch(e=>console.log(e))
                    return
                }
                case "boost_off2":{
                    const res = await Check(interaction.user.id)
                    if(!res) return interaction.reply({content:"you need to bind your account to discord to be able to do this",ephemeral:true,components:[bindButton]}).catch(e=>console.log(e))
                    await Boost_off(interaction.user.id);
                    return await interaction.reply({content:"Turn Off Your Login Boost",ephemeral:true}).catch(e=>console.log(e))
                }
                case "import":{
                    const res = await Check(interaction.user.id)
                    if(!res) return interaction.reply({content:"you need to bind your account to discord to be able to do this",ephemeral:true,components:[bindButton]}).catch(e=>console.log(e))
                    return interaction.reply({embeds:[embedTransfer],ephemeral:true,components:[bindChannelButton]}).catch(e=>console.log(e))
                }
                case "bind":{
                    try{
                    const res = await Check(interaction.user.id)
                    if(res) return interaction.reply({content:"you already binded",ephemeral:true}).catch(e=>console.log(e))
                    interaction.showModal(bindModal).catch(e=>console.log(e))
                    const submitted = await interaction.awaitModalSubmit({time:60000,filter: i => i.user.id == interaction.user.id})
                    if (submitted){
                        const username = submitted.fields.getTextInputValue('username')
                        const password = submitted.fields.getTextInputValue('password')
                        const user = await prisma.users.findUnique({where:{username:username},select:{id:true,password:true}}).catch(e=>console.log(e))
                        if (user===null) {await prisma.$disconnect();return submitted.reply({content:"cant find username",ephemeral:true}).catch(e=>console.log(e))};
                        if (await Decrypt(password,String(user?.password))){
                            const character = await prisma.characters.findMany({where:{user_id:user?.id},select:{id:true}})
                            if (character.length == 0) return submitted.reply({content:"you dont have any character, please make one on launcher",ephemeral:true}).catch(e=>console.log(e))
                            const embed  = await Embed(Number(character[0].id))
                            if(!embed)return submitted.reply({content:"you still have *READY TO HUNT* character, please login with that character untill safely enter mezeporta then logout to be able to bind\nor delete that charachter in launcher",ephemeral:true}).catch(e=>console.log(e))
                            const row1 = new ActionRowBuilder<ButtonBuilder>()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId(`male${interaction.user.id}`)
                                    .setLabel('Register as Male')
                                    .setStyle(ButtonStyle.Primary),
                                    )
                                row1.addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`female${interaction.user.id}`)
                                        .setLabel('Register as Female')
                                        .setStyle(ButtonStyle.Secondary),
                                        );
                            if(character.length > 1){
                                row1.addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`next${interaction.user.id}`)
                                        .setLabel('Get next Character')
                                        .setStyle(ButtonStyle.Success),
                                        );}
                            submitted.reply({components:[row1],embeds:[embed[0]],files:[embed[1]],ephemeral:true}).catch(e=>console.log(e))
                            if (!interaction.channel?.isTextBased()) return
                            const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 400000 })
                            const role = await interaction.guild?.roles.fetch(process.env.REGISTERED_ROLE)
                            let order = 0
                            collector.on('collect', async i => {
                                console.log('test')
                                console.log(i.customId)
                                switch (i.customId){
                                    case `male${interaction.user.id}`:{
                                        if (interaction.guild == null) return
                                        const checker = await prisma.discord.findFirst({where:{char_id:character[order].id},select:{char_id:true}}).catch(e=>console.log(e))
                                        if (checker !== null) {
                                            i.reply({ephemeral:true,content:"that character already owned"}).catch(e=>console.log(e))
                                            break
                                        }
                                        Bind(interaction.user.id,Number(character[order].id),true)
                                        i.reply({content:"congrats you have registered now",ephemeral:true}).catch(e=>console.log(e))
                                        collector.stop()
                                        await prisma.$disconnect()
                                        if (role==null)break
                                        await (await interaction.guild.members.fetch(interaction.user.id)).roles.add(role)
                                        break
                                    }
                                    case `female${interaction.user.id}`:{
                                        if (interaction.guild == null) return
                                        const checker = await prisma.discord.findFirst({where:{char_id:character[order].id},select:{char_id:true}}).catch(e=>console.log(e))
                                        if (checker !== null) {
                                            i.reply({ephemeral:true,content:"that character already owned"}).catch(e=>console.log(e))
                                            break
                                        }
                                        Bind(interaction.user.id,Number(character[order].id),false)
                                        i.reply({content:"congrats you have registered now",ephemeral:true}).catch(e=>console.log(e))
                                        collector.stop()
                                        await prisma.$disconnect()
                                        if (role==null)break
                                        await (await interaction.guild.members.fetch(interaction.user.id)).roles.add(role)
                                        break
                                    }case `next${interaction.user.id}`:{
                                        order += 1
                                        if (order>=character.length) {order = 0}
                                        const wembed = await Embed(character[order].id)
                                        if(wembed){
                                        interaction.editReply({embeds:[wembed[0]],files:[wembed[1]]})
                                        }else{i.reply({content:"you still have *READY TO HUNT* character, please login with that character untill safely enter mezeporta then logout to be able to bind\nor delete that charachter in launcher",ephemeral:true}).catch(e=>console.log(e));break}
                                        i.reply({content:"getting other character",ephemeral:true}).catch(e=>console.log(e))
                                        break
                                    }
                                    default:{break}
                        }})} else {
                            await prisma.$disconnect()
                            return interaction.reply({content:"pasword not match",ephemeral:true}).catch(e=>console.log(e))
                        }
                    }}catch(e){console.error}
                }
                case "create":{
                    try{
                    const res = await Dcheck(interaction.user.id)
                    if(res) return interaction.reply({content:`you already have an account with charachter id ${res}`,ephemeral:true}).catch(e=>console.log(e))
                    const res2 = await CheckAcc(interaction.user.id)
                    if(res2) return interaction.reply({content:`you already have an account with user id ${res2.user_id}`,ephemeral:true}).catch(e=>console.log(e))
                    interaction.showModal(createAcount).catch(e=>console.log(e))
                    const submitted = await interaction.awaitModalSubmit({time:60000,filter: i => i.user.id == interaction.user.id}).catch(e=>console.log(e))
                    if (submitted){
                        const username = submitted.fields.getTextInputValue('username')
                        const password = submitted.fields.getTextInputValue('password')
                        const data = await Regis(username,password)
                        if (!data) return submitted.reply({content:`failed to interact with server try again after some minutes`,ephemeral:true}).catch(e=>console.log(e))
                        const ch =await client.channels.fetch(process.env.USER_CREATE_LOG_CHANNEL)
                        if (data){submitted.reply({content:"New Account Succesfully Created",ephemeral:true}).catch(e=>console.log(e))
                            if (ch?.isTextBased()){ch.send(`${interaction.user.username}#${interaction.user.discriminator} created new account`).catch(e=>console.log(e))}
                            await Write(interaction.user.id,data)
                        }else{submitted.reply({content:"Username Already Exist",ephemeral:true}).catch(e=>console.log(e))}
                    }}catch(e){console.error}
                }
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