const Discord = require('discord.js');
const { DisTube } = require('distube');

const client = new Discord.Client({
    partials: [
        Discord.Partials.Channel, // for text channel
        Discord.Partials.GuildMember, // for guild member
        Discord.Partials.User, // for discord user
    ],
    intents: [
        Discord.GatewayIntentBits.Guilds, // for guild related things
        Discord.GatewayIntentBits.GuildMembers, // for guild members related things
        Discord.GatewayIntentBits.GuildIntegrations, // for discord Integrations
        Discord.GatewayIntentBits.GuildVoiceStates, // for voice related things
    ] 
});

const fs = require('node:fs');
const config = require('../config.json');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const cron = require('node-cron');

client.config = require('../config.json');
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
        new YtDlpPlugin(),
    ]
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.commandArray = [];

const task = cron.schedule('0 0 */1 * * *', async() => {
    let { hour, amPm, timezoneOffsetString } = getTimeInfo();

    if (voiceChannel.members.size >= 1) {
        try {
            const connection = await voiceChannel.join();
            let count = 1;

            (function play(Client) {
                connection.play('../bigben.mp3')
                .on('finish', () => {
                    count += 1;
                    if (count <= hour && config.matchDingsWithHour == 'true') {
                        play(Client);
                    } else {
                        connection.disconnect();
                    }
                })
            })();
        } catch(error) {
            console.log(error);
        }
    }
});

const getTimeInfo = () => {
    let time = new Date();
    let hour = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
    hour = hour === 0 ? 12 : hour;
    let amPm = time.getHours() >= 12 ? 'PM' : 'AM';
    let gmtOffset = time.getTimezoneOffset() / 60;
    let timezoneOffsetString = `${gmtOffset > 0 ? '-':'+'} ${Math.abs(gmtOffset)}`;

    return {
        hour,
        amPm,
        timezoneOffsetString
    }
}

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

task.start();

client.handleEvents();
client.handleCommands();
client.login(config.token);