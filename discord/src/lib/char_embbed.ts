import {EmbedBuilder,AttachmentBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const iconlist = ['./icon/GS.png', './icon/HS.png', './icon/H.png', './icon/L.png', './icon/SS.png', './icon/LB.png', './icon/DS.png',
'./icon/LS.png', './icon/HH.png', './icon/GL.png', './icon/B.png', './icon/T.png', './icon/SAF.png', './icon/MS.png']

export default async function Embed(char_id:number) {
    const charachter = char_id ? await prisma.characters.findFirst({where:{id:char_id},select:{name:true,user_id:true,id:true,weapon_type:true,last_login:true,hrp:true,gr:true}}).catch(e=>console.log(e)):null
    const discord=  char_id ? await prisma.discord.findFirst({where:{char_id:char_id},select:{is_male:true}}).catch(e=>console.log(e)):null
    const user = charachter ? await prisma.users.findFirst({where:{id:charachter.user_id},select:{username:true,id:true}}).catch(e=>console.log(e)):null
    const gid = charachter ? await prisma.guild_characters.findFirst({where:{character_id:char_id},select:{guild_id:true}}).catch(e=>console.log(e)):"no guild"
    const guild = gid !== "no guild"? await prisma.guilds.findFirst({where:{id:gid?.guild_id},select:{id:true,name:true,leader_id:true}}).catch(e=>console.log(e)): "no id"
    await prisma.$disconnect()
    const attachment:any =  new AttachmentBuilder(iconlist[Number(charachter?.weapon_type)])
    const gender =discord ? discord.is_male ? "Male" : "Female" : "not Registered"
    const embed:any = new EmbedBuilder()
        .setAuthor({name: `${charachter?.name}`})
        .setColor(getThemeColor("text"))
        .setThumbnail(`attachment://${iconlist[Number(charachter?.weapon_type)].replace('./icon/','')}`)
        .addFields(
        {name:"User", value:`Username:${user?.username}\nUser_ID:${user?.id}\nChar_Id:${charachter?.id}\nLast Login:<t:${charachter?.last_login}:R>`,inline:false},
        {name:"Character", value:`Gender:${gender}\nHRP:${charachter?.hrp}\nGR:${charachter?.gr}`,inline:false},
        {name:"Guild", value:`Guild:${guild !== "no id"?guild?.name:gid}\nGuild_ID:${guild !== "no id"?guild?.id:guild}\nLeader_Id:${guild !== "no id"?guild?.leader_id:"no lead"}`,inline:false})
    return [embed,attachment]
}