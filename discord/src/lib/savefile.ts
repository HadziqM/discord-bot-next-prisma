import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let get_save = async (did:string) => {
    const discord :any = await prisma.discord.findFirst({where:{discord_id:did}}).catch(e=>console.log(e))
    const save:any = await prisma.characters.findFirst({where:{id:discord.char_id}}).catch(e=>console.log(e))
    return save.savedata
}
export default get_save