module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const welcomeRole = await member.guild.roles.cache.find(role => role.id === '833538706925289584');
		await member.roles.add(welcomeRole);

		const welcomeChannel = await member.guild.channels.cache.find(channel => channel.id === '920420290838790174');
		await welcomeChannel.fetch();
		welcomeChannel.send('who?');
	},
};