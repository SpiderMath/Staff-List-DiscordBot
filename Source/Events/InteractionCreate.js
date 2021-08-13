const { stripIndents } = require("common-tags");

/**
 * @type {keyof import("discord.js").ClientEvents}
 */
module.exports.name = "interactionCreate";

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Interaction} interaction
 */
module.exports.run = async function(client, interaction) {
	if(interaction.isCommand()) {
		// If the interaction is a command
		const command = client.commands.get(interaction.commandName);

		// Owner(s) only
		if(!client.owners.includes(interaction.user.id)) return;

		// Deferring just in case
		await interaction.deferReply();

		try {
			await command.run(interaction, client);
		}
		catch(err) {
			client.logger.error("client/commands", stripIndents`
			Error Message: ${err.message}
			Error Stack: ${err.stack}
			`);

			interaction.editReply(":x: Something went wrong while executing the command..");
		}
	}
};