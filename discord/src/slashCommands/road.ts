import { SlashCommandBuilder, EmbedBuilder} from "discord.js"
import client from "..";
import Road from "../lib/road";
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("road")
    .setDMPermission(false)
    .setDescription("see road leaderboard")
    ,
    execute: async interaction => {
        const data = await Road()
        if (!data) return interaction.reply({content:'there is a problem connecting to server',ephemeral:true})
        interaction.deferReply()
        const first = await client.users.fetch(String(data[0].discord))
        let embed = new EmbedBuilder()
            .setTitle('Road Leaderboar')
            .setFooter({text:`I m the number one`,iconURL:first.displayAvatarURL()})
            .setColor('Aqua')
            .setThumbnail(String(client.user?.displayAvatarURL()))
        for (let i=0;i<data.length;i++){
            const dc = await client.users.fetch(String(data[i].discord))
            embed.addFields({name:dc.username,value:`name : ${data[i].name}\nstage : ${data[i].stage}`})
        }
        interaction.editReply({embeds:[embed]})
    },
    cooldown: 10
}

export default command