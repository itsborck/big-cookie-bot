const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autorole-configure')
		.setDescription('Configure the autorole feature')
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription('The role to give to new members')
				.setRequired(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const targetRoleId = interaction.options.getRole('role').id;

		try {
			await interaction.deferReply();

			let autoRole = await AutoRole.findOne({ guildId: interaction.guild.id });

			if (autoRole) {
				if (autoRole.roleId === targetRoleId) {
					interaction.editReply('Auto role has already been configured to that role. To disable run `/autorole-disable`');
					return;
				}

				autoRole.roleId = targetRoleId;
			}
			else {
				autoRole = new AutoRole({
					guildId: interaction.guild.id,
					roleId: targetRoleId,
				});
			}

			await autoRole.save();
			interaction.editReply('Auto role has been configured. To disable run `/autorole-disable`');
		}
		catch (error) {
			console.log(error);
		}
	},
};