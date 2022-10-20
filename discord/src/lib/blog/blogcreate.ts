import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Bind(thumb:string,category:string,title:string,blog:string,username:string,avatar:string) {
    await prisma.$disconnect()
}