import { SlashCommandBuilder, EmbedBuilder,ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand,GuildFile } from "../types";
import client from "../index"
import {readFileSync} from 'fs'

function jsondata(){
    const raw = readFileSync('./prerender_data/guild_data.json')
    return JSON.parse(String(raw)) as GuildFile
}
function build_button(data:number,state:number,user:string){
    let row2:any = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`p${user}`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬅️'),
			)
row2.addComponents(
    new ButtonBuilder()
    .setCustomId('gnum')
    .setLabel(`${state}/${data}`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
)
row2.addComponents(
    new ButtonBuilder()
    .setCustomId(`n${user}`)
    .setStyle(ButtonStyle.Primary)
    .setEmoji('➡️')
)

 return row2
}
async function build_embed(data:any){
    const disc = data.lead_discord === "Leader Not Registered"? data.lead_discord: await client.users.fetch(data.lead_discord)
    let embed = new EmbedBuilder()
        .setAuthor({name: `${data.name}`})
        .setColor(getThemeColor("text"))
        .addFields(
            {name:"General Details",value:` 🆔 Guild_id: ${data.id}\n 🏛️ Created: <t:${data.created}:R> \n 🧑‍🤝‍🧑 Member Count: ${data.member}/60 \n 🎖️ Rank Point : ${data.rp} \n 🏰 Level : ${data.level}`},
            {name:"Leader Details",value:` 🆔 Leader_id: ${data.lead_id}\n 🏷️ Leader Name: ${data.lead} \n 🎮 Leader Discord: ${String(disc)}`},
        )
    if (disc !== "Leader Not Registered"){embed.setFooter({ text: `lead by ${disc.username}`, iconURL: `${disc.displayAvatarURL()}` })}
    return embed
}
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Shows Server's Guild List")
    ,
    execute: async interaction => {
        // interaction.reply({content:"fetching guild data from database",ephemeral:true})
        const data = jsondata().guild
        let state = 1 
        let button = build_button(data.length,state,interaction.user.id)
        let embed = await build_embed(data[state-1])
        interaction.reply({embeds:[embed],components:[button]})
        if (!interaction.channel?.isTextBased()) return
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 400000 })
        collector.on('collect', async i => {
            switch (i.customId){
                case `p${interaction.user.id}`:{
                    state -= 1;
                    if (state <= 0){state = data.length};
                    button = build_button(data.length,state,interaction.user.id);
                    embed = await build_embed(data[state-1]);
                    await interaction.editReply({embeds:[embed],components:[button]})
                    i.deferUpdate()
                    break
                }
                case `n${interaction.user.id}`:{
                    state += 1;
                    button = build_button(data.length,state,interaction.user.id);
                    embed = await build_embed(data[state-1]);
                    await interaction.editReply({embeds:[embed],components:[button]})
                    i.deferUpdate()
                    break
                }
                default:{break}
            }
        });

    },
    cooldown: 10
}

export default command