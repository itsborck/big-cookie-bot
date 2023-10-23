const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Return embed'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle('This is an EMBED!')
        .setDescription(':3')
        .setColor(0x18e1ee)
        .setImage(client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag
        })
        .addFields([
            {
                name: 'Field 1',
                value: 'Field Value 1',
                inline: true
            },
            {
                name: 'Field 2',
                value: 'Field 2 Value',
                inline: true
            }
        ]);

        await interaction.reply({
            embeds: [embed]
        });
    }
}