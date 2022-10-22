import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Submitted(type:number,cname:string,uname:string,cid:number,team:string) {
    const wtf = await prisma.submitted.create({data:{type_b:type,cid:cid,team:team,cname:cname,uname:uname,t_submit:Math.floor(new Date().getTime()/1000)}})
    return wtf.id
}