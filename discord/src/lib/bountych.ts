import { PrismaClient } from "@prisma/client"
import { writeFileSync } from "fs"
import getBuff from "./urlbuf"

const prisma = new PrismaClient()
export default async function Changebt(type:number,bbq:string,bounty:any,ticket:any,id:number,url:any,desc:any) {
    let res = true
    const data = await prisma.distribution.findUnique({where:{id:id},select:{data:true}}).catch(e=> {res = false})
    if (data == null)return false
    if (desc !== null){await prisma.bounty.updateMany({where:{title:bbq},data:{explain:desc}}).catch(e=> {res = false})}else
    if (url !== null){
        const buff = await getBuff(url)
        writeFileSync(`./bounty/${bbq}.png`,buff)
    }
    const solo = async () =>{
        if (bounty !== null){await prisma.bounty.updateMany({where:{title:bbq},data:{solo_point:bounty}}).catch(e=> {res = false})}else
        if (ticket !== null){await prisma.bounty.updateMany({where:{title:bbq},data:{solo_ticket:ticket}}).catch(e=> {res = false})}
        writeFileSync(`./bounty_b/${bbq}S.bin`,data.data)
    }
    const multi = async () => {
        if (bounty !== null){await prisma.bounty.updateMany({where:{title:bbq},data:{multi_point:bounty}}).catch(e=> {res = false})}else
        if (ticket !== null){await prisma.bounty.updateMany({where:{title:bbq},data:{multi_ticket:ticket}}).catch(e=> {res = false})}
        writeFileSync(`./bounty_b/${bbq}M.bin`,data.data)
    }
    if (type==1){
        await solo()
    }else if (type==2){
        await multi()
    }else{
        await solo()
        multi()
    }
    await prisma.$disconnect()
    return res
}