import {bounty, PrismaClient, submitted} from "@prisma/client";
import {readFileSync} from 'fs'


const prisma = new PrismaClient();

export async function Accept(id:number) {
    const data = await prisma.submitted.findUnique({where:{id:id}})
    if (data === null) return false
    const res = await Check(data)
    let wtf = {
        type:data.type_b,
        result:res,
        uname:data.avatar,
        cname:data.url_i,
        avatar:data.uname,
        url:data.cname,
        bbq:data.bbq
    }
    return wtf
}
async function Check(data:submitted) {
    const bounty:any = await prisma.bounty.findFirst({where:{title:data.bbq}})
    if (data.type_b==1){
        let status = 0
        try{
        const file = readFileSync(`./bounty_b/${data.bbq}S.bin`)
        await prisma.distribution.create({data:{character_id:data.cid,data:file,type:1,bot:true,event_name:"Bounty Gift",description:`~C05${data.bbq} Solo Reward`}})}
        catch(e){
            status = 1
        }
        const discord:any = await prisma.discord.findFirst({where:{char_id:data.cid}})
        if (data.bbq == 'SP' && discord?.road_champion==false){
            await prisma.discord.updateMany({where:{char_id:data.cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.solo_point)),gacha:(Number(discord?.gacha)+Number(bounty?.solo_ticket)),latest_bounty:data.bbq,latest_bounty_time:data.t_submit,road_champion:true}})
            return ['road',status,discord.discord_id]
        }else if (data.bbq == 'BBQ07' && discord?.rain_demolizer==false){
            await prisma.discord.updateMany({where:{char_id:data.cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.solo_point)),gacha:(Number(discord?.gacha)+Number(bounty?.solo_ticket)),latest_bounty:data.bbq,latest_bounty_time:data.t_submit,rain_demolizer:true}})
            return ['demolizer',status,discord.discord_id]
        }else if (Number(discord?.bounty) >= 200000 && discord?.bounty_champion==false){
            await prisma.discord.updateMany({where:{char_id:data.cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.solo_point)),gacha:(Number(discord?.gacha)+Number(bounty?.solo_ticket)),latest_bounty:data.bbq,latest_bounty_time:data.t_submit,bounty_champion:true}})
            return ['champion',status,discord.discord_id]
        }else if (Number(discord?.bounty) >= 50000 && discord?.bounty_master==false){
            await prisma.discord.updateMany({where:{char_id:data.cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.solo_point)),gacha:(Number(discord?.gacha)+Number(bounty?.solo_ticket)),latest_bounty:data.bbq,latest_bounty_time:data.t_submit,bounty_master:true}})
            return ['master',status,discord.discord_id]
        }else if (Number(discord?.bounty) >= 25000 && discord?.bounty_expert==false){
            await prisma.discord.updateMany({where:{char_id:data.cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.solo_point)),gacha:(Number(discord?.gacha)+Number(bounty?.solo_ticket)),latest_bounty:data.bbq,latest_bounty_time:data.t_submit,bounty_master:true}})
            return ['expert',status,discord.discord_id]
        }else{
            await prisma.discord.updateMany({where:{char_id:data.cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.solo_point)),gacha:(Number(discord?.gacha)+Number(bounty?.solo_ticket)),latest_bounty:data.bbq,latest_bounty_time:data.t_submit}})
            return ["norm",status,discord.discord_id]
        }
    }
    else if(data.type_b==2){return await Mcheck(data.cid,data.bbq,bounty,data.t_submit)}else{
        const cidlist:string[] = JSON.parse(data.team)
        let wtf: any[] = []
        for (let i=0;i<cidlist.length;i++){
            const res = await Mcheck(Number(cidlist[i]),data.bbq,bounty,data.t_submit)
            wtf.push(res)
        }
        return wtf
    }
}
async function Mcheck(cid:number,bbq:string,bounty:bounty,t_submit:number){
    
    let status = 0
    try{
    const file = readFileSync(`./bounty_b/${bbq}M.bin`)
    await prisma.distribution.create({data:{character_id:cid,data:file,type:1,bot:true,event_name:"Bounty Gift",description:`~C05${bbq} Multi Reward`}})}
    catch(e){
        status= 1
    }    
    const discord:any = await prisma.discord.findFirst({where:{char_id:cid}})
        if (bbq == 'SP' && discord?.road_champion==false){
            await prisma.discord.updateMany({where:{char_id:cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.multi_point)),gacha:(Number(discord?.gacha)+Number(bounty?.multi_ticket)),latest_bounty:bbq,latest_bounty_time:t_submit,road_champion:true}})
            return ['road',status,discord.discord_id]
        }else if (bbq == 'BBQ07' && discord?.rain_demolizer==false){
            await prisma.discord.updateMany({where:{char_id:cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.multi_point)),gacha:(Number(discord?.gacha)+Number(bounty?.multi_ticket)),latest_bounty:bbq,latest_bounty_time:t_submit,rain_demolizer:true}})
            return ['demolizer',status,discord.discord_id]
        }else if (Number(discord?.bounty) >= 200000 && discord?.bounty_champion==false){
            await prisma.discord.updateMany({where:{char_id:cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.multi_point)),gacha:(Number(discord?.gacha)+Number(bounty?.multi_ticket)),latest_bounty:bbq,latest_bounty_time:t_submit,bounty_champion:true}})
            return ['champion',status,discord.discord_id]
        }else if (Number(discord?.bounty) >= 50000 && discord?.bounty_master==false){
            await prisma.discord.updateMany({where:{char_id:cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.multi_point)),gacha:(Number(discord?.gacha)+Number(bounty?.multi_ticket)),latest_bounty:bbq,latest_bounty_time:t_submit,bounty_master:true}})
            return ['master',status,discord.discord_id]
        }else if (Number(discord?.bounty) >= 25000 && discord?.bounty_expert==false){
            await prisma.discord.updateMany({where:{char_id:cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.multi_point)),gacha:(Number(discord?.gacha)+Number(bounty?.multi_ticket)),latest_bounty:bbq,latest_bounty_time:t_submit,bounty_master:true}})
            return ['expert',status,discord.discord_id]
        }else{
            await prisma.discord.updateMany({where:{char_id:cid},data:{bounty:(Number(discord?.bounty)+Number(bounty?.multi_point)),gacha:(Number(discord?.gacha)+Number(bounty?.multi_ticket)),latest_bounty:bbq,latest_bounty_time:t_submit}})
            return ["norm",status,discord.discord_id]
        }
}