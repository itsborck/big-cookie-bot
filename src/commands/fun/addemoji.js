const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addemoji')
		.setDescription('Add an emoji to the server')
		.addStringOption(option =>
			option
				.setName('emoji')
				.setDescription('The emoji you want to add')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the emoji')
				.setRequired(true),
		),
	async execute(interaction) {
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
			return await interaction.reply({ content: 'You do not have the permissions to use this command!', ephemeral: true });
		}

		let emoji = interaction.options.getString('emoji')?.trim();
		const name = interaction.options.getString('name');

		if (emoji.startsWith('<') && emoji.endsWith('>')) {
			const id = emoji.match(/\d{15,}/g)[0];

			const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
				.then(image => {
					if (image) return 'gif';
					else return 'png';
				})
				.catch(() => {
					return 'png';
				});

			const emojiUrl = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`;
			emoji = emojiUrl;
		}

		if (!emoji.startsWith('http')) {
			return await interaction.reply({ content: 'You cannot add default emojis!', ephemeral: true });
		}

		if (!emoji.startsWith('https')) {
			return await interaction.reply({ content: 'You cannot add default emojis!', ephemeral: true });
		}

		interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}` })
			// eslint-disable-next-line no-shadow
			.then(emoji => {
				const embed = new EmbedBuilder()
					.setColor('Random')
					.setDescription(`Added ${emoji} with the name "**${name}**"`);

				return interaction.reply({ embeds: [embed] });
			}).catch(() => {
				interaction.reply({ content: 'You cannot add this emoji because the emoji limit for your server has been reached', ephemeral: true });
			});
	},
};