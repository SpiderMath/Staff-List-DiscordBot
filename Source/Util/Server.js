const express = require("express");

const application = express();

function keepAlive(client) {
	application.all("/", (req, res) => {
		res.send("The bot is hosted and running".bold());
	});

	const port = process.env.PORT || 3000;

	application.listen(port, () => {
		client.logger.success("client/server", "The server is up and running");
	});
}

module.exports = keepAlive;