import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Gjoin(name:string,char_id:number) {
    try{
    const Pguild = prisma.guilds.findFirst({where:{name:name},select:{id:true}})
    const Pg_char = prisma.guild_characters.findFirst({where:{character_id:char_id},select:{id:true}})
    const [guild_characters,guild] = await Promise.all([Pg_char,Pguild])
    if (guild === null){await prisma.$disconnect();return false}
    if (guild_characters !== null){await prisma.$disconnect();return false}
    const Porder = prisma.guild_characters.aggregate({where:{guild_id:guild.id},_count:{id:true},_max:{order_index:true}})
    const Pid = prisma.guild_characters.aggregate({_max:{id:true}})
    const [order,ids] =await Promise.all([Porder,Pid])
    if (order._count.id >= 60 ){await prisma.$disconnect();return false}
    await prisma.guild_characters.create({data:{character_id:char_id,guild_id:guild.id,id:Number(ids._max.id)+1,order_index:Number(order._max.order_index)+1,avoid_leadership:true}})
    await prisma.$disconnect()
    return true} catch{
        console.error
        await prisma.$disconnect()
        return false
    }
}

export async function fixOrder(){
    try{
        const list =await prisma.guilds.findMany({select:{leader_id:true,id:true}})
        await Promise.all(list.map(async e => {
            const order = await prisma.guild_characters.findMany({where:{guild_id:e.id},select:{character_id:true},orderBy:{id:"asc"}})
            for (let i=2;i<order.length+2;i++){
                if (order[i-2].character_id === e.leader_id){
                    await prisma.guild_characters.update({where:{character_id:e.leader_id},data:{order_index:1}})
                }else{
                    await prisma.guild_characters.update({where:{character_id:order[i-2].character_id},data:{order_index:i}})
                }
            }
            await prisma.$disconnect()
        }))
        return true
    }catch(e){
        console.log(e)
        await prisma.$disconnect()
        return false
    }
}
export async function changeLeader(guild_id:number,char_id:number){
    try{
        const [check,leader] =await Promise.all([
            prisma.guild_characters.findMany({where:{guild_id:guild_id},select:{character_id:true,order_index:true}}),
            prisma.guilds.findUnique({where:{id:guild_id},select:{leader_id:true}})
        ])
        const candidate = check.filter(e=>e.character_id===char_id)
        if (candidate.length == 0)return false
        await Promise.all([
            prisma.guild_characters.update({where:{character_id:char_id},data:{order_index:1,avoid_leadership:false}}),
            prisma.guild_characters.update({where:{character_id:leader?.leader_id},data:{order_index:candidate[0].order_index}})
        ])
        await prisma.$disconnect()
        return true
    }catch{
        console.error
        await prisma.$disconnect()
        return false
    }
}