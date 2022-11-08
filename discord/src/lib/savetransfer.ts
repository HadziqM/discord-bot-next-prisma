import { PrismaClient } from "@prisma/client";
import getBuff from "./urlbuf";


const prisma = new PrismaClient()
const savelist = ['savedata','partner','decomyset','hunternavi','otomoairou','platebox','platedata','platemyset','rengokudata','savemercenary','skin_hist']
const savedata = savelist.map(e=>`${e}.bin`)


export default async function transferFile(url:string,size:number,cid:number,name:string|null) {
    if (size>=100000) return "malicius"
    const buffer = await getBuff(url)
    if (name==null) return "invalid"
    if (!savedata.includes(name))return "invalid"
    const index = savedata.indexOf(name)
    await prisma.characters.update({where:{id:cid},data:{[savelist[index]]:buffer}})
    await prisma.$disconnect()
    return `transfer ${name} success`
}