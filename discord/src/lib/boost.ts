import {PrismaClient} from "@prisma/client";
import {EmbedBuilder } from "discord.js"
import { getThemeColor } from "../functions";
const prisma = new PrismaClient();

const available = (data:number) => {
    switch (data){
        case 0:{return "Available"}
        case 1:{return "cooldown"}
        default:{return "Active"}
    }
}
export default async function Boost(cid:number) {
    const user = await prisma.login_boost_state.findMany({where:{char_id:cid},orderBy:{week_req:'asc'},select:{end_time:true}})
    const embed = new EmbedBuilder()
        .setAuthor({name: 'Login Boost'})
        .setColor(getThemeColor("data"))
        .addFields(
        {name:"Week 1 ", value: available(user[0].end_time),inline:false},
        {name:"Week 2 ", value: available(user[1].end_time),inline:false},
        {name:"Week 3 ", value: available(user[2].end_time),inline:false},
        {name:"Week 4 ", value: available(user[3].end_time),inline:false},
        {name:"Week 5 ", value: available(user[4].end_time),inline:false},
        )
    await prisma.$disconnect()
    return embed
}