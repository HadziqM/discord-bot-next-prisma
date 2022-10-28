import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Pull from '../lib/gacha/pull'
import getBuff from '../lib/urlbuf'
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("pull")
    .setDescription("change persons password if theyare unregistered")
    .addNumberOption(option => option.setName('pull').setDescription('Pull Methode').setRequired(true).addChoices(
        {name:"Single Pull",value:1},
        {name:"Multi Pull",value:10}
    )),
    execute: async interaction => {
        const pull = Number(interaction.options.get("pull")?.value)
        interaction.deferReply()
        const result = await Pull(interaction.user.id,pull)
        if (!result){return await new Promise(()=>setTimeout(()=>interaction.editReply("Youare Not Registerd"),2000))} else
        if (result==="not enough"){return await new Promise(()=>setTimeout(()=>interaction.editReply(result),2000))}
        let wtf
        if(pull==1){
            wtf = `${process.env.NEXTAUTH_URL}/api/og/single?avatar=${interaction.user.displayAvatarURL({extension:'png'})}&&rarity=${result.rarity}&&item=${result.item}`
        }else{wtf = `${process.env.NEXTAUTH_URL}/api/og/multi?avatar=${interaction.user.displayAvatarURL({extension:'jpg'})}&&param=${JSON.stringify(result.query)}`}
        const att = new AttachmentBuilder(await getBuff(wtf),{name:'og.png'})
        const embed = new EmbedBuilder()
            .setTitle("Congrats You got")
            .setDescription(` 🎰 Pity Count: ${result.pity}\n 🪙 Ticket : ${result.ticket}`)
            .setImage("attachment://og.png")
            .setColor('Random')
            .setFooter({text:`Pulled by ${interaction.user.username}`,iconURL:interaction.user.displayAvatarURL()})
            await new Promise(r => setTimeout(r, 2000));
        interaction.editReply({files:[att],embeds:[embed]})        
    },
    cooldown: 10
}

export default command;