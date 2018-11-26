const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permissions to execute this command***");
	if(!args[0]) return message.channel.send("no");
	message.channel.bulkDelete(args[0]).then(() => {
		message.channel.send(":white_check_mark:" + ` ***Purged ${args[0]} messages***`).then(msg => msg.delete(5000));
	});

}

module.exports.help = {
  name: `${prefix}purge`
}
