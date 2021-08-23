const { join } = require("path");
const { writeFileSync } = require("fs");
const updateStaffList = require("../Util/UpdateStaffList");
const { MessageEmbed } = require("discord.js");

/**
 * @type {import("discord.js").ApplicationCommandData}
 */
module.exports.config = {
	name: "updatechannel",
	description: "Add the channel to which the bot will be pushing notifications",
	options: [{
		name: "channel",
		description: "The channel you want to add",
		type: "CHANNEL",
		required: true,
	}],
};

/**
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {import("discord.js").Client} client The discord client.
 */
module.exports.run = async (interaction, client) => {
	const channel = interaction.options.getChannel("channel", true);

	if(channel.type !== "GUILD_TEXT") return interaction.editReply(":x: You can only have updates in Text channels!");

	client.data.channel = channel.id;

	writeFileSync(join(__dirname, "../../config.json"), JSON.stringify(client.data, null, "\t"));

	await interaction.editReply({
		embeds: [
			new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Added Channel")
				.setTimestamp()
				.setDescription(`Successfully set <#${channel.id}> as the channel for further updates`),
		],
	});

	client.message = null;

	updateStaffList(client);
};