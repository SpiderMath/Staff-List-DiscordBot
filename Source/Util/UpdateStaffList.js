const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");

/**
 * @param {import("discord.js").Client} client
 */
module.exports = async function updateStaffList(client) {
	if(!client.data.channel) return;
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(client.data.channel);

	const embedList = new Array();

	const baseEmbed = new MessageEmbed()
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL())
		.setColor("GREEN")
		.setTitle("Staff List")
		.setThumbnail(channel.guild.iconURL({ dynamic: true }));

	client.data.staff.map(({ role, alias }) => {
		// Per role loader.
		const members = channel.guild.members.cache.filter(member => member.roles.cache.has(role)).map(member => member.user.username);

		return stripIndents`
					${alias.length > 0 ? `**${alias}**` : `${channel.guild.roles.cache.get(role).name}`}
					${members.length === 0 ? "No one has that role, yet." : `**${members.join("**, **")}**`}
				`;
	}).forEach(str => baseEmbed.addField(str.split("\n")[0], str.split("\n").slice(1).join(""), true));

	embedList.push(baseEmbed);

	if(!client.message) {
		// Purging previous bot messages
		const messages = await channel.messages.fetch({
			limit: 50,
		});

		const clientMessages = messages.filter(msg => msg.author.id === client.user.id);

		await channel.bulkDelete(clientMessages);

		// Sending embed
		client.message = await channel.send({ embeds: embedList });
	}

	client.message.edit({
		embeds: embedList,
	});
};