import { CommandInteraction } from "discord.js";
import BaseSlashCommand from "../Base/BaseSlashCommand";
import StaffListerClient from "../Base/Client";

export default class PingCommand extends BaseSlashCommand {
	constructor(client: StaffListerClient) {
		super(client, {
			name: "ping",
			description: "Gets the API Latency of the bot",
		});
	}

	public async run(interaction: CommandInteraction) {
		interaction.editReply(`🏓 Pong! API Latency of the Bot is: ${this.client.ws.ping} ms`);
	}
}