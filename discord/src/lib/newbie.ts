import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient()

export default async function Newbie(name:string,did:string) {
    const discord = await prisma.discord.findUnique({where:{discord_id:did},select:{newbie:true,char_id:true}})
    const char = await prisma.characters.findUnique({where:{id:discord?.char_id},select:{gr:true}})
    console.log(char,discord)
    if (discord!==null && Number(char?.gr) > 200 && Number(char?.gr) <= 500 && discord.newbie){
        await prisma.discord.update({where:{discord_id:did},data:{newbie:false}})
        const data  = readFileSync(`./bounty_b/${name}.bin`)
        await prisma.distribution.create({data:{character_id:discord?.char_id,data:data,type:1,bot:true,event_name:"Newbie Gift",description:`~C05${name} Newbie Reward`}})
        return true
    }
    return false
}