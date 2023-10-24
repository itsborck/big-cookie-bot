const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity({
            name: 'bigcookie.org',
            type: ActivityType.Playing,
            url:'bigcookie.org'
        });
    },
};