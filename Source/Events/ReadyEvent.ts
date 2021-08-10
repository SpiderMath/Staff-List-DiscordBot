import BaseEvent from "../Base/BaseEvent";
import StaffListerClient from "../Base/Client";

export default class ReadyEvent extends BaseEvent {
	constructor(client: StaffListerClient) {
		super(client, "ready");
	}

	public async handler() {
		this.client.logger.success("client", `Logged in as ${this.client.user?.tag}`);

		await this.client.guilds.fetch();

		// @ts-ignore
		await this.client.guilds.cache.get(process.env.GUILD_ID)?.commands.set(this.client.commands.map(c => c.config));
	}
};