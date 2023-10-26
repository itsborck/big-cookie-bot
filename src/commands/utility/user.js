const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about a user.'),
	async execute(interaction) {
		// interaction.user is the object representing the user who sent the command
		// interaction.member is the GuildMember object, which represents the user in the specified guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};