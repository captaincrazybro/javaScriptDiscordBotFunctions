const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send(":x:" + " ***I couldn't find this user***f").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let reason = args.join(" ").slice(22);
	if(!reason) return message.channel.send(":x:" + " ***Please specify a reason***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
		
	let reportEmbed = new Discord.RichEmbed()
	.setDescription("Reports")
	.setColor(`#ffff00`)
	.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
	.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);
	
	let reportschannel = message.guild.channels.find(`name`, "logs");
	if(!reportschannel) return message.channel.send(":x:" + " ***Couldn't find reports channel.***");
	reportschannel.send(reportEmbed);
	message.channel.send(":white_check_mark: ***" + `${rUser}` + "*** ***has been reported***").then(m => {
		message.delete().catch(O_o=>{});
	});
		
}

module.exports.help = {
	name: `${prefix}report`
}
