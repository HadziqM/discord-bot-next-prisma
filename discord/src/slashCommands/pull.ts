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
        interaction.deferReply()
        const result = await Pull(interaction.user.id,pull)
        if (!result){return await new Promise(()=>setTimeout(()=>interaction.editReply("Youare Not Registerd"),2000))} else
        if (result==="not enough"){return await new Promise(()=>setTimeout(()=>interaction.editReply(result),2000))}
        let wtf
        if(pull==1){
            wtf = `http://localhost:8080/api/og/single?avatar=${interaction.user.displayAvatarURL({extension:'png'})}&&rarity=${result[1]}&&item=${result[0]}`
        }else{wtf = `http://localhost:8080/api/og/multi?avatar=${interaction.user.displayAvatarURL({extension:'jpg'})}&&param=${JSON.stringify(result)}`}
        const att = new AttachmentBuilder(await getBuff(wtf),{name:'og.png'})
        interaction.editReply({files:[att]})        
    },
    cooldown: 10
}

export default command;