import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const savelist = ['savedata','partner','decomyset','hunternavi','otomoairou','platebox','platedata','platemyset','rengokudata','savemercenary','skin_hist']
let get_save = async (did:string) => {
    const discord :any = await prisma.discord.findFirst({where:{discord_id:did}}).catch(e=>console.log(e))
    const save:any = await prisma.characters.findFirst({where:{id:discord.char_id}}).catch(e=>console.log(e))
    return savelist.map((e) => save[e] !== undefined ? save[e] !== null ? [save[e],`${e}.bin`] : "nothing" :"nothing")
}
export default get_save