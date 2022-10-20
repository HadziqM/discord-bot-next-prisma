import { ModalBuilder,ActionRowBuilder, SlashCommandBuilder, ModalActionRowComponentBuilder, TextInputBuilder, TextInputStyle, InteractionCollector, ComponentType, ModalSubmitInteraction} from "discord.js";
import { SlashCommand } from "../types";

const title = new TextInputBuilder().setCustomId('title').setStyle(TextInputStyle.Short).setRequired(true).setLabel("Blog's Title")
const desc = new TextInputBuilder().setCustomId('description').setStyle(TextInputStyle.Paragraph).setRequired(true).setLabel("Blog's Body")
const row1 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(title)
const row2 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(desc)
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("blog")
    .setDescription("experimental discord's web blog")
    .addStringOption(o => o.setName('category').setDescription('pick category').setRequired(true).addChoices(
        {name:'wtf',value:'wtf'},
    ))
    .addAttachmentOption(option => option.setName('thumbnail').setDescription('set thumbnail for your blog').setRequired(true)),
    execute: async interaction => {
        const attachment = interaction.options.get('thumbnail')?.attachment?.url
        const category = String(interaction.options.get('category'))
        let modal = new ModalBuilder().setCustomId(`blog${interaction.user.id}`).setTitle('Create New Blog')
        modal.setComponents(row1,row2)
        interaction.showModal(modal)
        const submitted = await interaction.awaitModalSubmit({time:400000,filter: i => i.user.id === interaction.user.id})
        if (submitted){
            const title1 = submitted.fields.getTextInputValue('title')
            const blog = submitted.fields.getTextInputValue('description')
        }
    },
    cooldown: 10
}

export default command;