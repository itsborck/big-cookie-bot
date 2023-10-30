const Discord = require('discord.js');

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
	],
});

const fs = require('node:fs');
const config = require('../config.json');
const cron = require('node-cron');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

client.config = require('../config.json');

let guild, voiceChannel;

const status = [
	{
		name: 'bigcookie.org',
		type: Discord.ActivityType.Watching,
		url: 'https://bigcookie.org',
	},
];

client.on('ready', async () => {
	try {
		guild = await client.guilds.fetch(config.guildId);
		voiceChannel = guild.channels.cache.get(config.voiceId);
	}
	catch (error) {
		console.log(error);
	}
	client.user.setActivity(status[0].name, { type: status[0].type, url: status[0].url });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.commandArray = [];

const task = cron.schedule('0 0 */1 * * *', async () => {

	if (voiceChannel && voiceChannel.members.size >= 1) {
		try {
			const player = createAudioPlayer();
			const connection = joinVoiceChannel({
				channelId: config.voiceId,
				guildId: config.guildId,
				adapterCreator: guild.voiceAdapterCreator,
				selfDeaf: false,
			});

			const audioResource = createAudioResource('./src/media/sounds/bigben.mp3');

			connection.subscribe(player);
			player.play(audioResource);

			player.on(AudioPlayerStatus.Idle, () => {
				connection.destroy();
			});
		}
		catch (error) {
			console.log(error);
		}
	}
});

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) {require(`./functions/${folder}/${file}`)(client);}
}

task.start();

client.handleEvents();
client.handleCommands();
client.login(config.token);