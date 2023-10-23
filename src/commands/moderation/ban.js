const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans the specified user.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The member you\'d like to ban.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for banning the user.')
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('target');
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = 'No reason provided.';

    user
      .send({
        content: `You have been banned from **${interaction.guild.name}** for **${reason}**.`,
      })
      .catch(console.log('user has DMs disabled.'));

    await member
      .ban({
        deleteMessageDays: 1,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Successfully banned **${user.tag}**.`,
    });
  },
};
