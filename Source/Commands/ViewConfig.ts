import { CommandInteraction, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../Base/BaseSlashCommand";
import StaffListerClient from "../Base/Client";

export default class ViewCurrentConfigCommand extends BaseSlashCommand {
	constructor(client: StaffListerClient) {
		super(client, {
			name: "viewconfig",
			description: "View the current configuration of the bot",
		});
	}

	public async run(interaction: CommandInteraction) {
		const configEmbed = new MessageEmbed()
			.setColor("YELLOW")
			.setFooter("RJain is awesome", this.client.user?.displayAvatarURL())
			.setTitle("Current Configuration")
			.addField("Configured Roles", this.client.data.roles.length === 0 ? "N.A" : this.client.data.roles.map(obj => `<@&${obj.id}> ${obj.alias === "dynamico" ? "" : obj.alias}`).join("\n"))
			.addField("Channel", this.client.data.channel.length === 0 ? "Not configured :x:" : `<#${this.client.data.channel}>`)
			.addField("MessageID", this.client.data.messageID || "None")
			.setTimestamp();

		interaction.editReply({
			embeds: [
				configEmbed,
			],
		});
	}
}