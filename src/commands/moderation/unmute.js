const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmutes the specified user.')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('The member you\'d like to unmute.')
				.setRequired(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const roleId = '961325659458777128';
		const member = await interaction.guild.members.fetch(user.id);

		if (!member.roles.cache.has(roleId)) {
			const embed = new EmbedBuilder()
				.setColor('#ff0000')
				.setDescription(`${user} is not muted.`)
				.setAuthor({
					name: interaction.user.tag,
					iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				})
				.setFooter({ text: `Requested by ${interaction.user.tag}` })
				.setTimestamp();
			await interaction.reply({ embeds: [embed], ephermeral: true });
			return;
		}

		try {
			await interaction.guild.members.cache.get(user.id).roles.remove(roleId);
			const embed = new EmbedBuilder()
				.setColor('#43b582')
				.setAuthor({
					name: interaction.user.tag,
					iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				})
				.setFooter({ text: `Requested by ${interaction.user.tag}` })
				.setTimestamp()
				.setDescription(`${user} has been unmuted.`);

			await interaction.reply({ embeds: [embed], ephermeral: true });
		}
		catch (error) {
			console.error(error);
			const embed = new EmbedBuilder()
				.setColor('#ff0000')
				.setAuthor({
					name: interaction.user.tag,
					iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				})
				.setFooter({ text: `Requested by ${interaction.user.tag}` })
				.setTimestamp()
				.setDescription(`Failed to unmute ${user}.`);
			await interaction.reply({ embeds: [embed], ephermeral: true });
		}
	},
};