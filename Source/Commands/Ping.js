/**
 * @type {import("discord.js").ApplicationCommandData}
 */
module.exports.config = {
	name: "ping",
	description: "Gets the API Latency of the Bot",
};

/**
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {import("discord.js").Client} client
 */
module.exports.run = (interaction, client) => {
	interaction.editReply(`The API Latency of the Bot is: ${client.ws.ping} miliseconds`);
};