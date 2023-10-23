const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the specified user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the user.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";

    user
      .send({
        content: `You have been kicked from **${interaction.guild.name}** for **${reason}**.`,
      })
      .catch(console.log("user has DMs disabled."));

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      content: `Successfully kicked **${user.tag}**.`,
    });
  },
};
