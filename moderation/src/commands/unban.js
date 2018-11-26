const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	let ubUser = args[0];
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":x:" + " You do not have permission to execute this command").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	if(!ubUser) return message.channel.send(":x:" + " ***I can't fine that user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let ubanChannel = message.guild.channels.find(`name`, "logs");
	if(!ubanChannel) return message.channel.send(":x:" + " ***I can't find this channel***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
		
	let unbanEmbed = new Discord.RichEmbed()
		.setDescription("Unban")
		.setColor("GREEN")
		.addField("Unbanned User", `${ubUser}`)
		.addField("Unbanned By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Unbanned In", message.channel)
		.addField("Time", message.createdAt)
		
	message.guild.unban(ubUser); 
	message.channel.send(":white_check_mark: ***" + `${ubUser}` + "*** ***has been unbanned***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	ubanChannel.send(unbanEmbed);
}

module.exports.help = {
    name: `${prefix}unban`
}
