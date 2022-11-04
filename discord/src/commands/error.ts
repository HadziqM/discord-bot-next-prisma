import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "server_news",
    execute: async (message, args) => {
        const embed1 = new EmbedBuilder().setTitle('List of Rain Server MHFZ bot Command').setDescription('experimental no database join server bot command').setColor('Aqua')
        const embed2 = new EmbedBuilder().setTitle('Context Menu Command').setColor('Blue').addFields(
            {name:' 💳 Card',value:`Show Yours, or selected users Game Status`},
            {name:' 🤡 Boost',value:`To see Yours, or selected users Login Boost Status`},
            {name:' 🥳 Event',value:`Show Yours, or selected users Event Status`},
            {name:' 🥋 Submit',value:`to submit your bounty to guild staff old way`},
        )
        const embed3 = new EmbedBuilder().setTitle('Slash Command').setColor('Blurple').addFields(
            {name:' 🎴 Mycard',value:`to display users mhfz status if already binded, its also have button to turn on boost, turn off boost, get save data, and unlocking transmog`},
            {name:' ✨ event',value:`to display users mhfz event status if already binded`},
            {name:' 🤡 boost',value:`to display users mhfz boost status if already binded`},
            {name:' ⛓️ Bind',value:`to bind discord id with game charachter (this use username and password for safety purpose)`},
            {name:' 🏛️ guild',value:`to show detailed list of guild on server, since the command is heavy this use prerendered file to make it fast`},
            {name:' 🧑‍💼 guild_join',value:`to join selected guild if player isnt on guild already`},
            {name:' ⏭️ transfer',value:`to evaluate player savedata and uploaded it to server if the format and content is correct`},
            {name:' 🤖 change_password',value:`registered player could freely change their account password`},
            {name:' 🧒 Newbie',value:`To clain newbie Reward`},
            {name:' 🥋 submit',value:`to submit your bounty to guild staff new version`},
            {name:' 🎰 pull',value:`To pull gacha`},
            {name:' 🎰 buy_ticket',value:`To buy gacha ticket`},
            {name:' 👶 create',value:`to create new account on the server`},
            {name:' 🎖️ road',value:`to see road ranking on server`},
            {name:' 🛑 blog',value:`to create new blogs on our website, guide and web under construction`},
        )
        const embed7 = new EmbedBuilder().setTitle('Accepted Transfer File Format').setDescription("```\nsavedata.bin\npartner.bin\ndecomyset.bin\nhunternavi.bin\notomoairou.bin\nplatebox.bin\nplatedata.bin\nplatemyset.bin\nrengokudata.bin\nsavemercenary.bin\nskin_hist.bin\n```").setColor('Aqua')
        message.channel.send({embeds:[embed1,embed2,embed3,embed7]})
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command