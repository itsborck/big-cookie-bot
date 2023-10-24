const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Times out the specified user.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The member you\'d like to timeout.')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('time')
        .setDescription(
          'The amount of time (in minutes) to timeout the user for.'
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for timing out the user.')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction, client) {
    const user = interaction.options.getUser('target');
    let reason = interaction.options.getString('reason');
    const time = interaction.options.getInteger('time');
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = 'No reason provided.';

    await member.timeout(time * 60 * 1000, reason).catch(console.error);

    await interaction.reply({
      content: `Successfully timed out **${user.tag}**.`,
    });
  },
};
