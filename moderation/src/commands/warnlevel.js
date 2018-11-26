const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require('../warnings.json');
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permissions to execute this command").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!wUser) return message.channel.send(":x:" + " ***I couldn't find this user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	}); 

	let warnlevel = warns[wUser.id].warns;
	
	if(warnlevel, (err) => {
		if(warnlevel === 1) return message.channel.send({embed: {
			color: 15105570,
			description: `<@${wUser.id}> has 0 warnings`
		}});
	});
		
	
	if(warnlevel === 1) return message.channel.send({embed: {
		color: 15105570,
		description: `<@${wUser.id}> has 1 warning`
	}});
	
	let warnlvlEmbed = new Discord.RichEmbed()
		.setColor("#FFA500")
		.setDescription(`<@${wUser.id}> has ${warnlevel} warnings`);
		
	message.channel.send(warnlvlEmbed);
	message.delete().catch(O_o=>{});
	
};

module.exports.help = {
	name: `${prefix}warnings`
}
