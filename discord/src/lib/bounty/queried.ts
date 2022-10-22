import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Submitted(type:number,cname:string,uname:string,cid:number,team:string,avatar:string,url:string,bbq:string) {
    const wtf = await prisma.submitted.create({data:{type_b:type,cid:cid,team:team,cname:cname,uname:uname,t_submit:Math.floor(new Date().getTime()/1000),avatar:avatar,url_i:url,bbq:bbq}})
    const cd = await prisma.bounty.findFirst({where:{title:bbq},select:{cooldown:true}})
    await prisma.bounty.updateMany({where:{title:bbq},data:{cooldown:Number(cd?.cooldown)-1}})
    await prisma.$disconnect()
    return wtf.id
}