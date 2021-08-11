import { GuildMember } from "discord.js";
import BaseEvent from "../Base/BaseEvent";
import StaffListerClient from "../Base/Client";

export default class GuildMemberUpdateEvent extends BaseEvent {
	constructor(client: StaffListerClient) {
		super(client, "guildMemberUpdate");
	}

	public async handler(oldMember: GuildMember, newMember: GuildMember) {

	}
};