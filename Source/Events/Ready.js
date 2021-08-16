/**
 * @type {keyof import("discord.js").ClientEvents}
 */
module.exports.name = "ready";

/**
 * @param {import("discord.js").Client} client
 */
module.exports.run = async function(client) {
	client.logger.success("client", `Logged in as ${client.user.tag}`);

	client.guilds.cache.get(process.env.GUILD_ID).commands.set(client.commands.map(c => c.config));
	client.logger.success("client/commands", `Loaded ${client.commands.size} commands in guild of ID: ${process.env.GUILD_ID}`);

	client.user.setActivity({
		name: "RJain",
		type: "STREAMING",
		url: "https://www.youtube.com/watch?v=YrgQxLoZHdQ",
	});
};