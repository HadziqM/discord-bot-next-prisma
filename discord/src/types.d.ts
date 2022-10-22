import { SlashCommandBuilder,ContextMenuCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, Interaction } from "discord.js"

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    cooldown?: number // in seconds
}

export interface ContextMenu{
    command: ContextMenuCommandBuilder | any,
    execute : (Interaction : CommandInteraction) => void,
    cooldown?:number,
}

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

interface GuildOptions {
    prefix: string,
}

export interface IGuild extends mongoose.Document {
    guildID: string,
    options: GuildOptions
    joinedAt: Date
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            PREFIX: string,
            TRANSVER_SAVE_LOG_CHANNEL:string,
            USER_CREATE_LOG_CHANNEL:string,
            EROR_LOG_CHANNEL:string,
            JOIN_CHANNEL:string,
            LEAVE_CHANNEL:string,
            RULE_CHANNEL:string,
            SUBMIT_CHANNEL:string,
            COOLDOWN_CHANNEL:string,
            LEADERBOARD_CHANNEL:string,
            PROMOTION_CHANNEL:string,
            CONQUER_CHANNEL:string,
            GACHA_CHANNEL:string,
            RULE_URL:string,
            CHAT_URL:string,
            GUIDE_URL:string,
            REGISTERED_ROLE:string,
            EXPERT_ROLE:string,
            MASTER_ROLE:string,
            CHAMPION_ROLE:string,
            ROAD_ROLE:string,
            DEMOLIZER_ROLE:string,
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}