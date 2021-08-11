import { CommandInteraction } from "discord.js";
import { writeFile } from "fs/promises";
import { join } from "path";
import BaseSlashCommand from "../Base/BaseSlashCommand";
import StaffListerClient from "../Base/Client";

export default class AddRoleCommand extends BaseSlashCommand {
	constructor(client: StaffListerClient) {
		super(client, {
			name: "addrole",
			description: "Adds a staff role to the database",
			options: [
				{
					name: "role",
					description: "The role which you want to add",
					type: "ROLE",
					required: true,
				},
				{
					name: "alias",
					description: "The alias which you want the role to have",
					type: "STRING",
					required: false,
				},
			],
		});
	}

	public async run(interaction: CommandInteraction) {
		const role = interaction.options.getRole("role", true);
		const alias = interaction.options.getString("alias", false) || "dynamico";

		this.client.data.roles.push({
			alias,
			id: role.id,
		});

		await writeFile(join(__dirname, "../../config.json"), JSON.stringify(this.client.data, null, "\t"));

		const configurationStatus = this.client.configured();

		if(configurationStatus === 0) {
			return interaction.editReply(`✔ Added ${role.name} to the list`);
		}

		else {
			return interaction.editReply(`✔ Added ${role.name} to the list. You have ${configurationStatus} tasks remaining to finish configuration`);
		}
	}
}