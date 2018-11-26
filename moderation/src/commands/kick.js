const Discord = require("discord.js");
const fs = require("fs");
let kick = require("../kickhistory.json");
let kickNumber = require("../kickhistory.json");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x:" + " You do not have permission to execute this command").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	}); 
	if(!kUser) return message.channel.send(":x:" + " ***I can't fine that user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let kReason = args.join(" ").slice(22);
	if(!kReason) return message.channel.send(":x:" + " ***Please specify a reason***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***This user can not be kicked!***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
		
	let kickEmbed = new Discord.RichEmbed()
	.setDescription("Kick")
	.setColor("RED")
	.addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
	.addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
	.addField("Kicked In", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", kReason);
		
	let kickChannel = message.guild.channels.find(`name`, "logs");
	if(!kickChannel) return message.channel.send(":x:" + " ***I can't find this channel***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
		
	message.guild.member(kUser).kick(kReason); 
	kickChannel.send(kickEmbed);
	message.channel.send(":white_check_mark: ***" + `${kUser}` + "*** ***has been kicked***");
	
 	if(!kick[kUser.id]) kick[kUser.id] = {
		kick: `\n- Kicked ${message.createdAt} for ${kReason}`
	} 
	if(kick[kUser.id].kick === "None"){
		kick[kUser.id].kick = `\n- Kicked ${message.createdAt} for ${kReason}`; 
	}else{
		let kickInfo = kick[kUser.id].kick;
		kick[kUser.id] = {
			kick: `${kickInfo} \n- Kicked on ${message.createdAt} for ${kReason}`
		}
	}

}

module.exports.help = {
	name: `${prefix}kick`
}
