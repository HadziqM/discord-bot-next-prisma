import { AttachmentBuilder, SlashCommandBuilder} from "discord.js";
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
        if(pull == 10){return interaction.reply({content:"under construction",ephemeral:true})}
        interaction.deferReply()
        const result = await Pull(interaction.user.id,pull)
        if (!result){return await new Promise(()=>setTimeout(()=>interaction.editReply("Youare Not Registerd"),3000))} else
        if (result==="not enough"){return await new Promise(()=>setTimeout(()=>interaction.editReply(result),3000))}
        const wtf = await getBuff(`http://localhost:8080/api/og/single?avatar=${interaction.user.displayAvatarURL({extension:'png'})}&&rarity=${result[1]}&&item=${result[0]}`)
        const att = new AttachmentBuilder(wtf,{name:'og.png'})
        interaction.editReply({files:[att]})        
    },
    cooldown: 10
}

export default command;