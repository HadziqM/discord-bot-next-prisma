import { PrismaClient } from '@prisma/client'
import {readFileSync} from 'fs'

const prisma = new PrismaClient()
const raw =readFileSync('./gacha/gacha.json')
const file = JSON.parse(String(raw))


export default async function Pull(did:string,pull:number) {
    const discord = await prisma.discord.findUnique({where:{discord_id:did},select:{gacha:true,pity:true,bounty:true}})
    if (!discord) return false
    if (pull == 1){
        if (Number(discord.gacha) < 10) return "not enough"
        discord.pity += 1
        discord.gacha -=10
        if (discord.pity == 30){
            await prisma.discord.update({where:{discord_id:did},data:{pity:0,gacha:discord.gacha}})
            return guaranteed()
        }else {
            const result = normal()
            if(result[1]==='ssr' || result[1]==='ur'){await prisma.discord.update({where:{discord_id:did},data:{pity:0,gacha:discord.gacha}});await prisma.$disconnect();return result}
            else{await prisma.discord.update({where:{discord_id:did},data:{pity:discord.pity,gacha:discord.gacha}});await prisma.$disconnect();return result}
    }}   
    else{
        if (Number(discord.gacha) < 100) return "not enough"
        const result = []
        for (let i=0;i<11;i++){
            discord.pity += 1
            if (discord.pity == 30){
                result.push(guaranteed())
                discord.pity = 0
            }
            else{
                let child = guaranteed()
                result.push(child)
                if(child[1]=='ssr' || child[1] =='ur') discord.pity=0;
            }
        }
        discord.gacha -=100
        await prisma.discord.update({where:{discord_id:did},data:{pity:discord.pity,gacha:discord.gacha}})
        await prisma.$disconnect()
        return result
    }
}


function normal(){
    const x = Math.random()
    if (x <= 0.001){return [file.ur.sample(),"ur"]} else
    if (0.001 < x && x <= 0.01){return [file.ssr1.sample(),"ssr"]} else
    if (0.01 < x && x <= 0.05){return [file.ssr2.sample(),"ssr"]} else
    if (0.05 < x && x <= 0.1){return [file.sr1.sample(),"sr"]} else
    if (0.1 < x && x <= 0.2){return [file.sr2.sample(),"sr"]} else
    if (0.2 < x && x <= 0.35){return [file.sr3.sample(),"sr"]} else
    if (0.35 < x && x <= 0.60){return [file.r1.sample(),"r"]} else
    {return [file.r2.sample(),"r"]}
}
function guaranteed(){
    const x = Math.random()
    if (x <= 0.1){return [file.ur.sample(),"ur"]} else
    if (0.1 < x && x <= 0.4){return [file.ssr1.sample(),"ssr"]} else
    {return [file.ssr2.sample(),"ssr"]}
}