import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("rule")
    .setDescription("scaffold rule message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: interaction => {
        interaction.reply({ephemeral:true,content:'ok'})
        const embed1 = new EmbedBuilder().setTitle('Greeting and Welcome to Rain Server 🎉 ').setDescription('First of all, our goal is to create a healthy server that resembles the official server it used to be. we want players to really get the same experience and fun as the official server when playing and grinding to get certain items here. therefore we manage to have some rules to maintain balance and fairness in this server. Here are some basic rules that all member must read and follow:').setColor('Aqua')
        const embed2 = new EmbedBuilder().setTitle('In Game Rules').setColor('Blue').addFields(
            {name:' 🛑 Cheating is bad',value:`> You are prohibited from using any kind of Cheats, especially "Cheat Engine" and other Memory Scanner/Debugger because it's very dangerous for the sustainability of our server. Any violation of this rule will be considered as an act of intentionally damaging the server and will be banned immediately (followed with other sanction)`}
        )
        const embed3 = new EmbedBuilder().setTitle('Comunity Rules').setColor('Blurple').addFields(
            {name:'1️⃣ Mentions Everyone is bad',value:`Please don't ever use the Everyone tag for mention the player, mention the user instead`},
            {name:' 2️⃣ Everyone Is Cool',value:`Please be kind and respect each other, Positive Community is all we got. if you can't (or won't) give any advice for someone questions, just simply ignore it and don't make any scene. Showing off your big brain by putting other people down doesn't prove you are any better.`},
            {name:' 3️⃣ Server isnt a market place',value:`You are prohibited to promote or advertise any content other than Monster Hunter themed without permission of Server's`},
            {name:' 4️⃣ No Horny',value:`No **NSFW** content under any circumstances.`},
            {name:' 5️⃣ Dont Be Childish',value:`No Fight, Flamming, Spam, and any other act that is against the rules that have been mentioned`},
            {name:'6️⃣ No Cheating',value:`Do not talk or even mention anything about cheats, any violation will get you Muted for a while, 3 times muted = auto kick`}
        )
        const embed4 = new EmbedBuilder().setTitle('Enclosure ').setDescription('Every acts of serious violators including or other than those stated in the rule will be subject to sanctions in the form of expulsion of members who violate\nSeriously guys no cheat engine, we will know whoever do it and we will give no mercy').setColor('Red').setFooter({text:`Thank you for your attention, warm regards and HAPPY HUNTING!!`,iconURL:interaction.user.displayAvatarURL()})
        const jp_embed1 = new EmbedBuilder().setTitle('ご挨拶とRain Serverへようこそ 🎉').setDescription('まず第一に、私たちの目標は、以前の公式サーバーに似た健全なサーバーを作成することです。ここで特定のアイテムを取得するためにプレイして粉砕するときに、プレイヤーが公式サーバーと同じ経験と楽しさを実際に得られるようにしたいと考えています。したがって、このサーバーでバランスと公平性を維持するためのいくつかのルールを管理しています。すべてのメンバーが読んで従わなければならないいくつかの基本的なルールを次に示します。').setColor('LightGrey')
        const jp_embed2 = new EmbedBuilder().setTitle('インゲームのルール').setColor('Green').addFields(
            {name:' 🛑 Cheating is bad',value:`> あらゆる種類のチート、特に「チート エンジン」やその他のメモリ スキャナ/デバッガの使用は、サーバーの持続可能性にとって非常に危険であるため禁止されています。この規則の違反は、サーバーに意図的に損害を与える行為と見なされ、直ちに禁止されます (その後、他の制裁が続きます)。`}
        )
        const jp_embed3 = new EmbedBuilder().setTitle('コミュニティルール').setColor('DarkGreen').addFields(
            {name:'1️⃣ Mentions Everyone is bad',value:`プレーヤーに言及するために Everyone タグを使用しないでください。代わりにユーザーに言及してください。`},
            {name:' 2️⃣ Everyone Is Cool',value:`親切にしてお互いを尊重してください。私たちが得たのはポジティブなコミュニティだけです。誰かの質問に対してアドバイスを提供できない (または提供しない) 場合は、単に無視して、シーンを作成しないでください。他の人をけなして自分の頭脳を見せびらかしても、自分が優れているとは言えません。`},
            {name:' 3️⃣ Server isnt a market place',value:`サーバーの @🌀 管理者の許可なしに、モンスター ハンターをテーマにしたコンテンツ以外を宣伝または宣伝することは禁止されています。`},
            {name:' 4️⃣ No Horny',value:`いかなる場合でも **NSFW** コンテンツはありません。`},
            {name:' 5️⃣ Dont Be Childish',value:` けんか、フラミング、スパム、および言及されているルールに反するその他の行為は禁止されています。`},
            {name:'6️⃣ No Cheating',value:`チートについて話したり言及したりしないでください。違反すると、しばらくの間ミュートされ、3 回ミュート = 自動キックされます`}
        )
        const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setLabel('Get Member Role').setStyle(ButtonStyle.Primary).setCustomId('Member').setEmoji('🍏')
        ).addComponents(
            new ButtonBuilder().setLabel('Hover To Chat Channel').setStyle(ButtonStyle.Link).setURL(process.env.CHAT_URL)
        ).addComponents(
            new ButtonBuilder().setLabel('Hover to Game Setup').setStyle(ButtonStyle.Link).setURL(process.env.GUIDE_URL)
        )
        interaction.channel?.send({components:[button],embeds:[embed1,embed2,embed3,jp_embed1,jp_embed2,jp_embed3,embed4]})
    },
    cooldown: 10
}

export default command