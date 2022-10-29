import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Bind(did:string,cid:number,gender:boolean) {
    await prisma.discord.create({data:{discord_id:did,char_id:cid,is_male:gender,gacha:100}})
    await prisma.$disconnect()
}