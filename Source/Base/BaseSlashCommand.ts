import StaffListerClient from "./Client";
import { ApplicationCommandData, CommandInteraction } from "discord.js";

export default abstract class BaseSlashCommand {
	public client: StaffListerClient;
	public config: ApplicationCommandData = {
		name: "",
		description: "",
	};

	constructor(client: StaffListerClient, config: ApplicationCommandData) {
		this.client = client;

		Object.defineProperty(this, "client", {
			configurable: true,
			enumerable: false,
			writable: true,
		});

		Object.assign(this.config, config);
	}

	// eslint-disable-next-line
	abstract run(interaction: CommandInteraction): Promise<any>
};