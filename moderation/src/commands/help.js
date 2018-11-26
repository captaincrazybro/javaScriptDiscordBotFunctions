const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
		let modEmbed = new Discord.RichEmbed()
			.setColor(`BLUE`)
			.setTitle("Mod Help")
			.setDescription("'[]' are not included in the commands")
			.addField("/warn [user] [reason]", "Warns a user")
			.addField("/history [user]", "How many warnings a user has had")
			.addField("/mute [user] [how long (I.E. 1m, 3d etc.)] [reason]", "Mutes a user for specified amount of time")
			.addField("/unmute [user]", "Unmutes a user")
			.addField("/kick [user] [reason]", "Kicks a user from the guild")
			.addField("/ban [user] [how long (I.E. 1m, 3d etc.)] [reason]", "Bans a user from the guild for a specified amount of time")
			.addField("/purge [number of messages]", "Deletes a certain ammount of messages");
		
		message.channel.send(modEmbed);
		return;
}

module.exports.help = {
	name: `${prefix}help`
}
