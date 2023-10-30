const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('frc-team')
		.setDescription('Get information about a FIRST Robotics Competition team')
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
			url: `https://www.thebluealliance.com/api/v3/team/frc${team}?X-TBA-Auth-Key=${config.tbaKey}`,
			responseType: 'json',
		})
			.then((response) => {
				const embed = new EmbedBuilder()
					.setTitle(`Information for Team ${response.data.team_number}`)
					.addFields(
						{ name: 'Team Name', value: `${response.data.nickname}` },
						{ name: 'Location', value: `${response.data.city}, ${response.data.state_prov}, ${response.data.country}`, inline: true },
						{ name: 'Rookie Year', value: `${response.data.rookie_year}` },
					);

				if (`${response.data.website}`) {
					embed.addFields({ name: 'Website', value: `${response.data.website}`, inline: true });
				}
				interaction.reply({ embeds: [embed] });
			});
	},
};