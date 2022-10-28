import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient()

export default async function Refresh() {
    const raw = readFileSync('./prerender_data/refresh.json')
    const json:any[] = JSON.parse(String(raw))
    try{
    for(let i=0;i<json.length;i++){
        await prisma.bounty.updateMany({where:{title:json[i].title},data:{cooldown:json[i].cooldown}})
    }}catch(e){
        return false
    }return true
}