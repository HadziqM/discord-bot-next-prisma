import {getThemeColor} from '../../functions'
import client from '../../index'
import {EmbedBuilder} from 'discord.js'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default  async function Leaderboard() {
    let lead = await prisma.discord.findMany({select:{bounty:true,discord_id:true,char_id:true},orderBy:{bounty:'desc'},where:{NOT:[{bounty:null}]}})
    lead.slice(0,10)
    const firstid = await prisma.characters.findUnique({where:{id:lead[0].char_id},select:{name:true}})
    let first = await client.users.fetch(lead[0].discord_id)
    let user = [first.username]
    let bounty = [lead[0].bounty]
    let embed = new EmbedBuilder()
        .setTitle("Leaderboard")
        .setColor(getThemeColor('variable'))
        .setThumbnail(first.displayAvatarURL())
        .addFields({name:user[0],value:`Ign: ${firstid?.name} Coin: ${lead[0].bounty}`})
        .setColor('Random')
    for (let i = 1;i<lead.length-1;i++){
        const uname = await client.users.fetch(lead[i].discord_id)
        const char = await prisma.characters.findUnique({where:{id:lead[i].char_id},select:{name:true}})
        user.push(uname.username)
        bounty.push(lead[i].bounty)        
        embed.addFields({name:user[i],value:`Ign: ${char?.name}\n Coin: ${lead[i].bounty}`})
        
    }
    await prisma.$disconnect()
    return {embed:embed}
}