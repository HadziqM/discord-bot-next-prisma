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

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}
interface Download{
    name:string,
    distribution:number,
}

interface guildfile{
    member:number,
    name:string,
    lead_id:number,
    lead:string,
    created:number,
    rp:number,
    level:number
}
export interface GuildFile{
    guild:guildfile[]
}
export interface Gacha {
    ur:string[],
    ssr1:string[],
    ssr2:string[],
    sr1:string[],
    sr2:string[],
    sr3:string[],
    r1:string[],
    r2:string[],
    download:Download[],
}

export interface PartnerGuild{
    partner:{
        guild_id:string,
        cooldown_msg:string,
        leaderboard_msg:string,
        cooldown_ch:string,
        leaderboard_ch:string
    }[]
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
            NEWS_CHANNEL:string,
            GAME_CHANNEL:string,
            RULE_CHANNEL:string,
            SUBMIT_CHANNEL:string,
            COOLDOWN_CHANNEL:string,
            LEADERBOARD_CHANNEL:string,
            PROMOTION_CHANNEL:string,
            CONQUER_CHANNEL:string,
            GACHA_CHANNEL:string,
            BOUNTY_LOG_CHANNEL:string,
            RECEPTIONIST_CHANNEL:string,
            RULE_URL:string,
            CHAT_URL:string,
            GUIDE_URL:string,
            BIND_URL:string,
            BOUNTY_URL:string,   
            GAME_URL:string,   
            NEWS_URL:string,   
            REGISTERED_ROLE:string,
            EXPERT_ROLE:string,
            MASTER_ROLE:string,
            CHAMPION_ROLE:string,
            ROAD_ROLE:string,
            DEMOLIZER_ROLE:string,
            MEMBER_ROLE:string,
            NEXTAUTH_URL:string,
            GUIDE_MSG:string,
            COOLDOWN_MSG:string,
            LEADERBOARD_MSG:string,
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
