import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();



export async function Scheck(discord_id:string,bbq:string) {
    const bounty = await prisma.bounty.findFirst({where:{title:bbq},select:{cooldown:true}})
    if (bounty?.cooldown === 0) {await prisma.$disconnect();return "Cooldown"}
    const discord = await prisma.discord.findUnique({where:{discord_id:discord_id},select:{char_id:true,latest_bounty:true,latest_bounty_time:true}})
    if (discord === null){await prisma.$disconnect();return false}
    const char = await prisma.characters.findUnique({where:{id:discord.char_id},select:{name:true}})
    const now = Math.floor(new Date().getTime()/1000)
    if (discord.latest_bounty === bbq){
        if ((discord.latest_bounty_time+40*60*60)>now) {await prisma.$disconnect();return "overheat"}
    }else{
        if ((discord.latest_bounty_time+20*60*60)>now) {await prisma.$disconnect();return "overheat"}
    }
    await prisma.$disconnect()
    return {cid:discord?.char_id,cname:String(char?.name)}
}
export async function Mcheck(discord_id:string,mentions:string[],bbq:string) {
    const now = Math.floor(new Date().getTime()/1000)
    const bounty = await prisma.bounty.findFirst({where:{title:bbq},select:{cooldown:true}})
    if (bounty?.cooldown === 0) {await prisma.$disconnect();return "Cooldown"}
    const mt = mentions.map(e=>e[0])
    const data = [discord_id,...mt]
    const cid : number[] = []
    const cname: string[] = []
    for (let i=0;i<data.length;i++){
        const discord = await prisma.discord.findUnique({where:{discord_id:data[i]},select:{char_id:true,latest_bounty:true,latest_bounty_time:true}})
        if (discord === null){await prisma.$disconnect();return false}
        const char = await prisma.characters.findUnique({where:{id:discord.char_id},select:{name:true}})
        if(bbq != "BBQ16"){
            if (discord.latest_bounty === bbq){
                if ((discord.latest_bounty_time+40*60*60)>now) {await prisma.$disconnect();return "overheat"}
            }else{
                if ((discord.latest_bounty_time+20*60*60)>now) {await prisma.$disconnect();return "overheat"}
            }
        }
        cid.push(discord.char_id)
        cname.push(String(char?.name))
    }
    await prisma.$disconnect()
    return {cid:cid,cname:cname,data:data}
}