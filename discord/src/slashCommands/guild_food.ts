import { PrismaClient } from "@prisma/client";
import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("guild_food")
    .setDMPermission(false)
    .setDescription("dont use it")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption(o=> o.setName('food').setDescription('choose food').setRequired(true).addChoices(
        {name:'Bakudandon',value:1},
        {name:'Pioneer Exciting Meal',value:109},
        {name:'Lucky Pancakes',value:163},
        {name:'Brother Grill',value:253},
        {name:'Fiery Tongs Feast Pot',value:253},
        {name:'Medicinal Prridge',value:332 },
        {name:'Heaven & Earth Rice',value:395},
        {name:'Goddes gems Sweets',value:422},
        {name:'Shellfish Iso-Yaki',value:455},
        {name:'Holy Seafood Banquet',value:500},
        {name:'Motivated Noodles',value:527},
        {name:"Hunter's Freaky Pot",value:551},
        {name:'Skewer Dumplings',value:596},
        {name:'Crimson BBQ Meat',value:614},
        {name:'Sweet Wrappings',value:632},
        {name:'Dawn Sky Toast',value:650},
        {name:'Five Colored Soup',value:668},
        {name:'Mori Mori Meat Pie',value:708},
        {name:'Blody Sala Salad',value:704},
        {name:'Fried Buns',value:712},
        ))
    .addNumberOption(o=> o.setName('duration').setDescription('choose duration').setRequired(true).addChoices(
        {name:'120 Hour',value:1447942614},
        {name:'250 Hour',value:1448411014}))
    .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(false)),
    execute: async interaction => {
        if(interaction.guild?.id !== "937230168223789066") return interaction.reply({content:"you can only use this on rain server as admin there",ephemeral:true})
        const mentions = String(interaction.options.get("mentions")?.value)
        const methode = Number(interaction.options.get("methode")?.value)
        const course = String(interaction.options.get("course")?.value)
        if (course !== '01' && course !== '02' && course !== '03' && course !== '04') return
        const dataCourse = {'01':1073742350,'02':1073742606,'03':1073742414,'04':1073746766}
        interaction.reply({content:'task accepted, wait for a while',ephemeral:true})
        const prisma = new PrismaClient()
        let ids
        if (methode===2){
            const data = mentions.match(/<@!?([0-9]+)>/g)
            if(data === null ){return interaction.reply({content:"No mentions Detected",ephemeral:true})}
            ids = data.map(e=>String(e.match(/([0-9]+)/g)))
            try{
                let i = 0
                while (i<ids.length+1){
                    const disc = await prisma.discord.findUnique({where:{discord_id:ids[i]},select:{char_id:true}})
                    if (disc==null) {
                        interaction.followUp({ephemeral:true,content:`<@${ids[i]}> is not registered yet`})
                        break
                    }
                    const char = await prisma.characters.findUnique({where:{id:disc.char_id},select:{user_id:true}})
                    await prisma.users.update({where:{id:char?.user_id},data:{rights:dataCourse[course]}})
                    i += 1
                }
            }catch(e){
                return await interaction.followUp({ephemeral:true,content:"failed on interacting with server wait for a few minutes for stable connection"})
            }
            interaction.followUp({ephemeral:true,content:"success"})
        }else{
            try{
                await prisma.users.updateMany({data:{rights:dataCourse[course]}})
            }catch{
                return await interaction.followUp({ephemeral:true,content:"failed on interacting with server wait for a few minutes for stable connection"})
            }
            interaction.followUp({ephemeral:true,content:"success"})
        }
        await prisma.$disconnect()
    },
    cooldown: 10
}

export default command