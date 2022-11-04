import { AttachmentBuilder, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import client from "..";
import { Accept } from "../lib/bounty/accepted";
import { Sembed, Nembed, Membed } from "../lib/bounty/embed";
import Leaderboard from "../lib/bounty/leaderboard";
import getBuff from "../lib/urlbuf";
import { SlashCommand } from "../types";
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("accept_db_id")
    .setDescription("re accept submitted bounty")
    .addNumberOption(option => option.setName('accepted').setDescription('accepted table id').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('password').setDescription('Person New Pasword').setRequired(true)),
    execute: async interaction => {
        if(interaction.guild?.id !== "937230168223789066") return interaction.reply({content:"you can only use this on rain server as admin there",ephemeral:true})
        interaction.reply({ephemeral:true,content:"begin opration"})
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
        const id = Number(interaction.options.get("accept")?.value)
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
                }
            }
            const embed = Membed(JSON.parse(accept.cname),JSON.parse(accept.uname),accept.url,accept.bbq,accept.avatar)
            conquer.send({embeds:[embed.embed],files:[embed.attach]})
        }
        const lead = await Leaderboard()
        msg?.edit({embeds:[lead.embed]})
    },
    cooldown: 10
}

export default command;