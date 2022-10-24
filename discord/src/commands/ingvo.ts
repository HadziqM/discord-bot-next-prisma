import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits} from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "guide",
    execute: async (message, args) => {
        const embed1 = new EmbedBuilder().setTitle('Greeting I Will Introduce Myself').setDescription('I will Take Over Elze Bot For A while for Testing Purpose. I Have more functionality than Elze and Solve many Bugs but i will be more strict than elze, keep in mind that while i solve many bugs, thing are getting slower especially on gacha since unlike elze i dont have good image editor library,for image editor I use Next JS API to connect to Vercel OG image generation open API and download processed image there').setColor('Aqua')
        const embed2 = new EmbedBuilder().setTitle('Context Menu Command').setColor('Blue').addFields(
            {name:' 💳 Card',value:`Show Yours, or selected users Game Status`},
            {name:' 🤡 Boost',value:`To see Yours, or selected users Login Boost Status`},
            {name:' 🥳 Event',value:`Show Yours, or selected users Event Status`},
        )
        const embed3 = new EmbedBuilder().setTitle('Slash Command').setColor('Blurple').addFields(
            {name:'1️⃣ Mycard',value:`to display users mhfz status if already binded, its also have button to turn on boost, turn off boost, get save data, and unlocking transmog`},
            {name:' 2️⃣ Bind',value:`to bind discord id with game charachter (this use username and password for safety purpose)`},
            {name:' 3️⃣ guild',value:`to show detailed list of guild on server, since the command is heavy this use prerendered file to make it fast`},
            {name:' 4️⃣ guild_join',value:`to join selected guild if player isnt on guild already`},
            {name:' 5️⃣ transfer',value:`to evaluate player savedata and uploaded it to server if the format and content is correct`},
            {name:'6️⃣ change_password',value:`registered player could freely change their account password`},
            {name:' 7️⃣ Newbie',value:`To clain newbie Reward`},
            {name:' 8️⃣ submit',value:`to submit your bounty to guild staff`},
            {name:' 9️⃣ pull',value:`To pull gacha`},
            {name:' 🛑 create',value:`to create new account on the server`},
            {name:' 🛑 blog',value:`to create new blogs on ourwebsite, guide and web under construction`},
        )
        const embed7 = new EmbedBuilder().setTitle('Accepted Transfer File Format').setDescription("```\nsavedata.bin\npartner.bin\ndecomyset.bin\nhunternavi.bin\notomoairou.bin\nplatebox.bin\nplatedata.bin\nplatemyset.bin\nrengokudata.bin\nsavemercenary.bin\nskin_hist.bin\n```").setColor('Aqua')
        const embed5 = new EmbedBuilder().setTitle('Admin Slash Command').setColor('Green').addFields(
            {name:' 🎁 add_bounty',value:`To add bounty point to mentioned peoples or all people`},
            {name:' 🎁 add_gacha',value:`To add gacha ticket to mentioned peoples or all people`},
            {name:' 🎁 distribution',value:`To give bounty reward to mentioned people or all people`},
            {name:' 🎁 custom',value:`To give custom distribution reward to mentioned people or all people`},
            {name:' 👮 mod_pass',value:`To change password given user input`},
            {name:' 👮 cooldown',value:`To change specified bounty cd`},
            {name:' 👮 resetcd',value:`To reset mentioned peoples bounty cooldown`},
            {name:' 👮 unbind',value:`To unbind mentioned peoples`},
            {name:' 🧭 status',value:`To see server database status`},
            {name:' 🧭 ping',value:`To see bots ping`},
            {name:' 🧭 clear',value:`To delete message automatically`},
            {name:' 🪐 ch_bounty',value:`To change bounty reward`},
            {name:' 🪐 dw_gacha',value:`To download gacha config .json`},
            {name:' 🪐 ch_gacha',value:`To change gacha pool given config .json`},
        )
        const embed6 = new EmbedBuilder().setTitle('Admin Normal Command').setColor('Green').addFields(
            {name:' 💻 render',value:`To render blog's content and upload it to website`},
            {name:' 💻 update',value:`To update prerender guild data`},
            {name:' 💻 delete',value:`To delete all bots application command on guild`},
            {name:' 💻 rule',value:`To setup guilds rule channel`},
            {name:' 💻 guide',value:`To send this message`},
        )
        const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setLabel('Hover To Bind Channel').setStyle(ButtonStyle.Link).setURL(process.env.BIND_URL)
        ).addComponents(
            new ButtonBuilder().setLabel('Hover to Bounty Channel').setStyle(ButtonStyle.Link).setURL(process.env.BOUNTY_URL)
        )
        message.channel.send({components:[button],embeds:[embed1,embed2,embed3,embed7,embed5,embed6]})
    },
    cooldown: 10,
    aliases: ["sayguide"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers]
}

export default command