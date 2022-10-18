import { Interaction } from "discord.js";
import { BotEvent } from "../types";

const event : BotEvent = {
    name: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return;
        
    }}

export default event