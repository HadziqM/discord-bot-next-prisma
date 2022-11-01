import {EmbedBuilder,AttachmentBuilder} from 'discord.js'


export const Sembed = (cname:string,uname:string,url:string,bbq:string,avatar:string) => {
    const embed = new EmbedBuilder()
    const att = new AttachmentBuilder(`./bounty/${bbq}.png`,{name:"bbq.png"})
    embed.setTitle(bbq).setThumbnail('attachment://bbq.png').setImage(url).setFooter({text:`submited by ${uname}`,iconURL:avatar}).addFields(
        {name:cname,value:`cleared : solo\n<t:${Math.floor(new Date().getTime()/1000)}:F>`}
    ).setColor('DarkBlue')
    return {embed:embed,attach:att}
}
export const Nembed = (cname:string,uname:string,url:string,bbq:string,avatar:string) => {
    const embed = new EmbedBuilder()
    const att = new AttachmentBuilder(`./bounty/${bbq}.png`,{name:"bbq.png"})
    embed.setTitle(bbq).setThumbnail('attachment://bbq.png').setImage(url).setFooter({text:`submited by ${uname}`,iconURL:avatar}).addFields(
        {name:cname,value:`cleared : solo with npc\n<t:${Math.floor(new Date().getTime()/1000)}:F>`}
    ).setColor('Aqua')
    return {embed:embed,attach:att}
}
export const Membed = (cname:string[],uname:string[],url:string,bbq:string,avatar:string) => {
    const embed = new EmbedBuilder()
    const att = new AttachmentBuilder(`./bounty/${bbq}.png`,{name:"bbq.png"})
    embed.setTitle(bbq).setThumbnail('attachment://bbq.png').setImage(url).setFooter({text:`submited by ${uname[0]}`,iconURL:avatar}).addFields(
        {name:'Team',value:`cleared : multiplayer \n <t:${Math.floor(new Date().getTime()/1000)}:F>`}
    ).setColor('Blue')
    for (let i=0;i<cname.length;i++){
        embed.addFields(
            {name:cname[i],value:`Discord: ${uname[i]}`}
        )
    }
    return {embed:embed,attach:att}
}