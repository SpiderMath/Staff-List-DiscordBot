const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");

/**
 * @param {import("discord.js").Client} client
 */
module.exports = async function updateStaffList(client) {
	if(!client.data.channel) return;

	if(!client.message) {
		/**
		 * @type {import ("discord.js").TextChannel}
		 */
		const channel = client.channels.cache.get(client.data.channel);

		const embedList = new Array();

		const baseEmbed = new MessageEmbed()
			.setTimestamp()
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setColor("GREEN")
			.setTitle("Staff List");

		let string = "";

		for(let i = 0; i < client.data.staff.length; i++) {
			let clone = string;
			const data = client.data.staff[i];

			const people = channel.guild.members.cache.filter(member => member.roles.cache.has(data.role));

			clone += stripIndents`
				${data.alias ? data.alias : `<&@${data.roleID}>`}
				${people.map(p => `<@!${p.user.id}>`).join(", ")}
			`;

			if(clone.length > 2048) {
				embedList.push(baseEmbed.setDescription(string));

				string = stripIndents`
					${data.alias ? data.alias : `<&@${data.roleID}>`}
					${people.map(p => `<@!${p.user.id}>`).join(", ")}
				`;
				string += "\n";
			}

			if(client.data.staff.length - i === 1) {
				embedList.push(baseEmbed.setDescription(string));
			}
		}

		client.message = await channel.send({
			embeds: embedList,
		});
	}

	else {
		/**
		 * @type {import ("discord.js").TextChannel}
		 */
		const channel = client.channels.cache.get(client.data.channel);

		const embedList = new Array();

		const baseEmbed = new MessageEmbed()
			.setTimestamp()
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setColor("GREEN")
			.setTitle("Staff List");

		let string = "";

		for(let i = 0; i < client.data.staff.length; i++) {
			let clone = string;
			const data = client.data.staff[i];

			const people = channel.guild.members.cache.filter(member => member.roles.cache.has(data.role));

			clone += stripIndents`
				${data.alias ? data.alias : `<&@${data.roleID}>`}
				${people.map(p => `<@!${p.user.id}>`).join(", ")}
			`;

			if(clone.length > 2048) {
				embedList.push(baseEmbed.setDescription(string));

				string = stripIndents`
					${data.alias ? data.alias : `<&@${data.roleID}>`}
					${people.map(p => `<@!${p.user.id}>`).join(", ")}
				`;
				string += "\n";
			}

			if(client.data.staff.length - i === 1) {
				embedList.push(baseEmbed.setDescription(string));
			}
		}

		client.message.edit({
			embeds: embedList,
		});
	}
};