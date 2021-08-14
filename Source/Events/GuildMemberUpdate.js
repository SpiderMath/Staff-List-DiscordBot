const updateStaffList = require("../Util/UpdateStaffList");

/**
 * @type {keyof import("discord.js").ClientEvents}
 */
module.exports.name = "guildMemberUpdate";

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember} oldMember
 * @param {import("discord.js").GuildMember} newMember
 */
module.exports.run = async function(client, oldMember, newMember) {
	// I only care if a role is added or removed, that too it has to be a Staff Role
	const diff = newMember.roles.cache.difference(oldMember.roles.cache);

	if(diff.size === 0) return console.log("Role not changed");

	const changedRoleID = diff.firstKey();

	// Only staff rolez wanted
	if(!client.data.staff.map(s => s.role).includes(changedRoleID)) return;

	await updateStaffList(client);
};