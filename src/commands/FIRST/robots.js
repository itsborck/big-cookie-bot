const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('robots')
		.setDescription('Get robot about a FIRST Robotics Competition team')
		.addIntegerOption(option =>
			option
				.setName('team')
				.setDescription('The team number')
				.setRequired(true),
		),
	async execute(interaction) {
		const team = interaction.options.getInteger('team');
		await axios({
			method: 'get',
			url: `https://www.thebluealliance.com/api/v3/team/frc${team}/robots?X-TBA-Auth-Key=${config.tbaKey}`,
			responseType: 'json',
		})
			.then((response) => {
				const embed = new EmbedBuilder()
					.setTitle(`Robot Information for Team ${team}`)
					.addFields(
						{ name: 'Robot Name', value: `${response.data.robot_name}` },
						{ name: 'Year', value: `${response.data.year}` },
					);
				interaction.reply({ embeds: [embed] });
			});
	},
};