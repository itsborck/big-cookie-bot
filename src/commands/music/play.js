const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a specified song from YouTube or Spotify')
        .addStringOption((option) =>
        option
            .setName('song')
            .setDescription('The song you\'d like to play')
            .setRequired(true)),
    async execute(interaction, client) {
        
    },
};