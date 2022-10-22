import {getThemeColor} from '@/src/functions'
import client from "@/src/index"
import {EmbedBuilder} from 'discord.js'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default  async function Leaderboard() {
    const lead = await prisma.discord.findMany({select:{bounty:true,discord_id:true,char_id:true}})
    const firstid = await prisma.characters.findUnique({where:{id:lead[0].char_id},select:{name:true}})
    let first = await client.users.fetch(lead[0].discord_id)
    let user = [first.username]
    let bounty = [lead[0].bounty]
    let log = "```\n"+user[0]+" = "+bounty[0]
    let embed = new EmbedBuilder()
        .setTitle("Leaderboard")
        .setColor(getThemeColor('variable'))
        .setThumbnail(first.displayAvatarURL())
        .addFields({name:user[0],value:`Ign: ${firstid?.name} Coin: ${lead[0].bounty}`})
    for (let i = 1;i<lead.length;i++){
        const uname = await client.users.fetch(lead[i].discord_id)
        const char = await prisma.characters.findUnique({where:{id:lead[i].char_id},select:{name:true}})
        user.push(uname.username)
        bounty.push(lead[i].bounty)
        log += "\n"+user[i]+" = "+bounty[i]
        if (i < 11){
            embed.addFields({name:user[i],value:`Ign: ${char?.name} Coin: ${lead[i].bounty}`})
        }
    }
    await prisma.$disconnect()
    log +="\n```"
    return {embed:embed,leg:log}
}