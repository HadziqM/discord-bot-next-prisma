import { PrismaClient } from "@prisma/client";
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";


const prisma = new PrismaClient()
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("database_role")
    .setDescription("update player role based on database")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        interaction.reply({content:"ok begin to scan guild\nthis will take long time to iterate discord user and database data",ephemeral:true})
        const expert =await interaction.guild?.roles.fetch(process.env.EXPERT_ROLE)
        const master = await interaction.guild?.roles.fetch(process.env.MASTER_ROLE)
        const champion = await interaction.guild?.roles.fetch(process.env.CHAMPION_ROLE)
        const road = await interaction.guild?.roles.fetch(process.env.ROAD_ROLE)
        const demolizer = await interaction.guild?.roles.fetch(process.env.DEMOLIZER_ROLE)
        if (demolizer==null || road==null ||champion==null ||master==null ||expert==null)return
        try{
            const player = await prisma.discord.findMany({select:{discord_id:true,rain_demolizer:true,road_champion:true,bounty_champion:true,bounty_master:true,bounty_expert:true}})
            prisma.$disconnect()
            await Promise.all(player.map(async e =>{
                const member = await interaction.guild?.members.fetch(e.discord_id)
                if(!(member==null)){
                    e.rain_demolizer && member.roles.add(demolizer)
                    e.road_champion && member.roles.add(road)
                    e.bounty_champion && member.roles.add(champion)
                    e.bounty_master && member.roles.add(master)
                    e.bounty_expert && member.roles.add(expert)
                }
            interaction.followUp({content:"success",ephemeral:true})
        }))}catch(e){
            console.log(e)
            interaction.followUp({content:"error on giving roles",ephemeral:true})
        }
        
    },
    cooldown: 10
}

export default command