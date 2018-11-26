const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	
	let umUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permission to execute this command***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	}); 
	if(!umUser) return message.channel.send(":x:" + " ***I couldn't find this user.***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let muterole = message.guild.roles.find(`name`, "muted");
	
	if(!umUser.roles.has(muterole.id)) return message.channel.send(":x:" + " ***This user is already unmuted***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
	let umuteChannel = message.guild.channels.find(`name`, "logs");
	
	let umuteEmbed = new Discord.RichEmbed()
		.setDescription("Unmute")
		.setColor("GREEN")
		.addField("Unmuted User", `${umUser} with ID: ${umUser.id}`)
		.addField("Unmuted By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Unmuted In", message.channel)
		.addField("Time", message.createdAt)
	
	
	umUser.removeRole(muterole.id);
	message.channel.send(":white_check_mark: ***" + `${umUser}` + "*** ***has been unmuted***");
	umUser.send(`You have been unmuted from ${message.guild.name}`);
	umuteChannel.send(umuteEmbed);
}

module.exports.help = {
	name: `${prefix}unmute`
}
