import { Client, Intents, Collection } from "discord.js";
import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import BaseSlashCommand from "./BaseSlashCommand";
import Logger from "../Util/Logger";
import { AsciiTable } from "../Util/AsciiTable";
import BaseEvent from "./BaseEvent";
import loadJSON from "../Util/LoadJSON";
import { existsSync } from "fs";
import { JSONDB } from "./Interfaces";

export default class StaffListerClient extends Client {
	public commands: Collection<string, BaseSlashCommand> = new Collection();
	public logger = new Logger();
	// @ts-ignore
	public owners: string[] = process.env.OWNERS?.split(",");
	public data: JSONDB = {
		roles: [],
		channel: "",
		messageID: "",
	};;

	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
			],
		});
	}

	public async start(options: {
		commandsDir: string,
		eventsDir: string,
	} = {
		commandsDir: join(__dirname, "../Commands/"),
		eventsDir: join(__dirname, "../Events/"),
	}) {
		if(!existsSync("../../config.json")) {
			await writeFile("../../config.json", JSON.stringify({
				roles: [],
				channel: "",
				messageID: "",
			}));
		}
		else {
			this.data = await loadJSON(join(__dirname, "../../config.json"));
		}

		await this.__loadCommands(options.commandsDir);
		await this.__loadEvents(options.eventsDir);

		await this.login(process.env.TOKEN);
	}

	private async __loadCommands(commandsDir: string) {
		const table = new AsciiTable("Commands");
		table.setHeading("Name", "Load Status");
		// Just going for the structure as
		// Commands Dir
		// - Files
		// Since simple stuff, not that many commands and stuff

		const files = await readdir(commandsDir);

		for(const file of files) {
			const pseudoPull = await import(join(commandsDir, file));

			const pull: BaseSlashCommand = new pseudoPull.default(this);

			this.commands.set(pull.config.name.toLowerCase(), pull);

			table.addRow(pull.config.name, "👀");
		}

		this.logger.success("client/commands", "\n" + table.toString());
	}

	private async __loadEvents(eventDir: string) {
		const table = new AsciiTable("Events");
		const files = await readdir(eventDir);
		table.setHeading("Name", "Load Status");

		for(const file of files) {
			const pseudoPull = await import(join(eventDir, file));

			const pull: BaseEvent = new pseudoPull.default(this);

			this.on(pull.name, async (...args) => await pull.handler(...args));
			table.addRow(pull.name, "👂");
		}

		this.logger.success("client/events", "\n" + table.toString());
	}

	public configured() {
		let count = 0;

		if(this.data.roles.length === 0) count++;
		if(this.data.channel === "") count++;
		if(this.data.messageID === "") count++;

		return count;
	};

};