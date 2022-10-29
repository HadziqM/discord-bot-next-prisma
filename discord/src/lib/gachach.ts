import { PrismaClient } from "@prisma/client";
import { readFileSync, writeFileSync } from "fs";

const prisma = new PrismaClient()

export default async function Chgacha() {
    let res = true
    const raw = String(readFileSync('./gacha/gacha.json'))
    const json = JSON.parse(raw)
    Promise.all(json.download.map( async (e:any) =>{
        const data = await prisma.distribution.findUnique({where:{id:e.distribution},select:{data:true}})
        if (data==null) return
        writeFileSync(`./gacha_b/${e.name}.bin`,data.data)
    })).catch(e =>{res = false})
    return res
}