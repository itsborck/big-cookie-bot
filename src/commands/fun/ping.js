const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.CreatedTimestamp - interaction.CreatedTimestamp}`;
        await interaction.editReply({
            content: newMessage,
        });
    },
};