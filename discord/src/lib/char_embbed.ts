import {EmbedBuilder,AttachmentBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const iconlist = ['./icon/GS.png', './icon/HS.png', './icon/H.png', './icon/L.png', './icon/SS.png', './icon/LB.png', './icon/DS.png',
'./icon/LS.png', './icon/HH.png', './icon/GL.png', './icon/B.png', './icon/T.png', './icon/SAF.png', './icon/MS.png']

export default async function Embed(char_id:number) {
    const charachter:any = char_id ? await prisma.characters.findFirst({where:{id:char_id}}).catch(e=>console.log(e)):null
    const discord :any =  char_id ? await prisma.discord.findFirst({where:{char_id:char_id}}).catch(e=>console.log(e)):null
    const user:any = charachter ? await prisma.users.findFirst({where:{id:charachter.user_id}}).catch(e=>console.log(e)):null
    const gid:any = charachter ? await prisma.guild_characters.findFirst({where:{character_id:char_id}}).catch(e=>console.log(e)):"no guild"
    const guild:any  = gid ? await prisma.guilds.findFirst({where:{id:gid.guild_id}}).catch(e=>console.log(e)): gid === "no guild" ? "no id":null
    await prisma.$disconnect()
    const attachment: any =  new AttachmentBuilder(iconlist[charachter.weapon_type])
    const gender =discord ? discord.is_male ? "Male" : "Female" : "not Registered"
    const embed = new EmbedBuilder()
        .setAuthor({name: `${charachter.name}`})
        .setColor(getThemeColor("text"))
        .setThumbnail(`attachment://${iconlist[charachter.weapon_type].replace('./icon/','')}`)
        .addFields(
        {name:"User", value:`Username:${user.username}\nUser_ID:${user.id}\nChar_Id:${charachter.id}\nLast Login:<t:${charachter.last_login}:R>`,inline:false},
        {name:"Character", value:`Gender:${gender}\nHRP:${charachter.hrp}\nGR:${charachter.gr}`,inline:false},
        {name:"Guild", value:`Guild:${guild.name}\nGuild_ID:${guild.id}\nLeader_Id:${guild.leader_id}`,inline:false})
    return [embed,attachment]
}