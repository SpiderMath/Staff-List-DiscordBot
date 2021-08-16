const { join } = require("path");
const { writeFileSync } = require("fs");
const updateStaffList = require("../Util/UpdateStaffList");
const { MessageEmbed } = require("discord.js");

/**
 * @type {import("discord.js").ApplicationCommandData}
 */
module.exports.config = {
	name: "removerole",
	description: "Removes a role from a user",
	options: [
		{
			name: "role",
			description: "The role to remove",
			type: "ROLE",
			required: true,
		},
	],
};

/**
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {import("discord.js").Client} client The discord client.
 */
module.exports.run = async function(interaction, client) {
	const role = interaction.options.getRole("role", true);

	client.data.staff = client.data.staff.filter(r => r.role !== role.id);

	writeFileSync(join(__dirname, "../../config.json"), JSON.stringify(client.data, null, "\t"));

	await updateStaffList(client);

	interaction.editReply({
		embeds: [
			new MessageEmbed()
				.setTimestamp()
				.setColor("GREEN")
				.setTitle("Removed role")
				.setDescription(`Removed role <@&${role.id}> from the database list`),
		],
	});
};