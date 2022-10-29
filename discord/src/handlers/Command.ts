import { Client, Routes, SlashCommandBuilder,ContextMenuCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { color } from "../functions";
import { Command, SlashCommand, ContextMenu } from "../types";

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []
    const commands : Command[] = []
    const contexs : ContextMenuCommandBuilder[] = []

    let slashCommandsDir = join(__dirname,"../slashCommands")
    let commandsDir = join(__dirname,"../commands")
    let contexsDir = join(__dirname,"../contextmenu")

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })

    readdirSync(commandsDir).forEach(file => {
        if (!file.endsWith(".js")) return;
        let command : Command = require(`${commandsDir}/${file}`).default
        commands.push(command)
        client.commands.set(command.name, command)
    })

    
    readdirSync(contexsDir).forEach(file => {
        if (!file.endsWith(".js")) return;
        let command : ContextMenu = require(`${contexsDir}/${file}`).default
        contexs.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })



    const rest = new REST({version: "10"}).setToken(process.env.TOKEN);
    const join_com = [...contexs,...slashCommands]

    rest.put(Routes.applicationCommands(String(process.env.CLIENT_ID)), {
        body: join_com.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log(color("text", `🔥 Successfully loaded ${color("variable", data.length)} slash command(s)`))
        console.log(color("text", `🔥 Successfully loaded ${color("variable", commands.length)} command(s)`))
    }).catch(e => {
        console.log(e)
    })
}