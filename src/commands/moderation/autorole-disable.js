const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autorole-disable')
		.setDescription('Disable the autorole feature')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		try {
			await interaction.deferReply();

			if (!(await AutoRole.exists({ guildId: interaction.guild.id }))) {
				interaction.editReply('Auto role has not been configured. To configure run `/autorole-configure`');
				return;
			}

			await AutoRole.findOneAndDelete({ guildId: interaction.guild.id });
			interaction.editReply('Auto role has been disabled. Use `/autorole-configure` to re-enable.');
		}
		catch (error) {
			console.log(error);
		}
	},
};