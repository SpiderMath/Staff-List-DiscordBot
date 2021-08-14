const { Client, Collection, Intents } = require("discord.js");
const { config } = require("dotenv");
const { readdirSync, existsSync, writeFileSync } = require("fs");
const { join } = require("path");
const AsciiTable = require("ascii-table");
const { green, red, yellow, blue, cyan } = require("ansi-colors");

console.log(cyan("OwO, starting up the Staff Lister Bot"));

// Loading up the Env Stuff
config();

// Loading up the Bot
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
	],
});

client.commands = new Collection();
client.logger = {
	warn: (context, message) => console.log(`${yellow(`${new Date().toUTCString()} ${context}`)}: ${message}`),
	success: (context, message) => console.log(`${green(`${new Date().toUTCString()} ${context}`)}: ${message}`),
	error: (context, message) => console.log(`${red(`${new Date().toUTCString()} ${context}`)}: ${message}`),
	info: (context, message) => console.log(`${blue(`${new Date().toUTCString()} ${context}`)}: ${message}`),
};

// Loading the Ownerssss
client.owners = process.env.OWNERS.split(",");

// Loading the daaaaaaataaaaaaaaaaaaaaaaaaaaaaaaaa
if(existsSync(join(__dirname, "../config.json"))) {
	client.logger.info("client/database", "The local data for the Roles List is available and loaded");

	client.data = require("../config.json");
}
else {
	client.logger.info("client/database", "The local data for the Roles List is not available and is being written");
	client.data = {
		channel: "",
		staff: [],
	};

	writeFileSync("config.json", JSON.stringify(client.data, null, "\t"));
}

client.logger.success("client/config", "✅ Loaded the data.");

// Loading Commands
const commandFiles = readdirSync(join(__dirname, "Commands"));
const commandTable = new AsciiTable("Commands");

commandTable.setHeading("Name", "Load Status");
/* Gonna keep it at that, since I wanna have a simple project structure */

for(const file of commandFiles) {
	const pull = require(`./Commands/${file}`);

	client.commands.set(pull.config.name, pull);
	commandTable.addRow(pull.config.name, "👀");
}

client.logger.success("client/commands", "\n" + commandTable.toString());

// Loading Events
const eventFiles = readdirSync(join(__dirname, "Events"));
const eventTable = new AsciiTable("Events");

eventTable.setHeading("Name", "Load Status");

for(const file of eventFiles) {
	const pull = require(`./Events/${file}`);

	client.on(pull.name, async (...args) => await pull.run(client, ...args));
	eventTable.addRow(pull.name, "👂");
}

client.logger.success("client/events", "\n" + eventTable.toString());

client.login(process.env.DISCORD_TOKEN);