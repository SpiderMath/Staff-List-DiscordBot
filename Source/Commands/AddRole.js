const { MessageEmbed } = require("discord.js");
const { writeFileSync } = require("fs");
const { join } = require("path");
const updateStaffList = require("../Util/UpdateStaffList");

/**
 * @type {import("discord.js").ApplicationCommandData}
 */
module.exports.config = {
	name: "addrole",
	description: "Adds a role to the database (to watch out for)",
	options: [
		{
			name: "role",
			type: "ROLE",
			description: "The role you want to add",
			required: true,
		},
		{
			name: "role-alias",
			type: "STRING",
			description: "Whether you want to call the role with an Alias or not",
			required: false,
		},
	],
};

/**
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {import("discord.js").Client} client The discord client.
 */
module.exports.run = async (interaction, client) => {
	const role = interaction.options.getRole("role", true);
	const roleAlias = interaction.options.getString("role-alias", false);

	client.data.staff.push({
		role: role.id,
		alias: roleAlias || "",
	});

	writeFileSync(join(__dirname, "../../config.json"), JSON.stringify(client.data, null, "\t"));

	await updateStaffList(client);

	interaction.editReply({
		embeds: [
			new MessageEmbed()
				.setTimestamp()
				.setColor("GREEN")
				.setTitle("Added Role")
				.setDescription(`The role <@&${role.id}> ${roleAlias ? `with alias ${roleAlias}` : "without role alias"} has been added to the database.`),
		],
	});
};