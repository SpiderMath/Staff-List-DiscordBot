import { stripIndents } from "common-tags";
import { CommandInteraction, Interaction } from "discord.js";
import BaseEvent from "../Base/BaseEvent";
import PhotoGenieClient from "../Base/Client";

export default class InteractionCreateEvent extends BaseEvent {
	constructor(client: PhotoGenieClient) {
		super(client, "interactionCreate");
	}

	public async handler(interaction: Interaction) {
		// Here I got some kind of interaction, which I need to determine in here.
		if(interaction.isCommand()) return await this._handleCommand(interaction as CommandInteraction);
	}

	private async _handleCommand(interaction: CommandInteraction) {
		// Here I am gonna deal with the command interaction.

		const commandName = interaction.commandName;

		const command = this.client.commands.get(commandName);

		// Personal Preference to just defer it just in case.
		await interaction.deferReply();

		try {
			command?.run(interaction);
		}
		catch(err: any) {
			// I'll just say something went wrong

			this.client.logger.error("client/commands", stripIndents`
				Error on command "${commandName}"
				Error Message: ${err.message}
				Error Stack: ${err.stack}
			`);

			interaction.editReply(stripIndents`
				Something went wrong while executing the command, please contact the owner for resolving the issue.
				Error: ${err.message}
			`);
		}
	}
};
