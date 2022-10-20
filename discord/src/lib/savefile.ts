import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const savelist = ['savedata','partner','decomyset','hunternavi','otomoairou','platebox','platedata','platemyset','rengokudata','savemercenary','skin_hist']
let get_save = async (did:string) => {
    const discord :any = await prisma.discord.findFirst({where:{discord_id:did},select:{char_id:true}}).catch(e=>console.log(e))
    const save:any = await prisma.characters.findFirst({where:{id:discord.char_id},select:{savedata:true,partner:true,decomyset:true,hunternavi:true,otomoairou:true,platebox:true,platedata:true,platemyset:true,rengokudata:true,savemercenary:true,skin_hist:true}}).catch(e=>console.log(e))
    await prisma.$disconnect()
    return savelist.map((e) => save[e] !== undefined ? save[e] !== null ? [save[e],`${e}.bin`] : "nothing" :"nothing")
}
export default get_save