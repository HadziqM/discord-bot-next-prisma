import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Bind(thumb:string,category:string,title:string,blog:string,username:string,avatar:string) {
    const idk:any =await prisma.blog.create({data:{thumbnail_url:thumb,discord_name:username,avatar_url:avatar,category:category,title:title,content:blog,created:Math.floor(new Date().getTime()/1000)}}).catch(e=>console.log(e))
    await prisma.$disconnect()
    return idk.id
}