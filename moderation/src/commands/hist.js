const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require('../warnings.json');
let reason = require('../warnings.json');
let mute = require('../mutehistory.json');
let kick = require('../kickhistory.json');
let ban = require('../banhistory.json');
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permissions to execute this command").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let wUser = message.guild.member(message.mentions.users.first() || args[0]);

 	if(args[0].length === 18){
		let hUser = args[0];
		
	if(!warns[hUser.id]) warns[hUser.id] = {
		warns: 0, 
		reason: ""
	};
	
	if(!kick[hUser.id]) kick[hUser.id] = {
		kick: 0
	};
	
	if(!mute[hUser.id]) mute[hUser.id] = {
		mute: "None"
	};
	
	if(!ban[hUser.id]) ban[hUser.id] = {
		ban: "0"
	};
	
	let warnlevel = warns[hUser.id].warns;
	let reasonlvl = reason[hUser.id].reason;
	let muteInfo = mute[hUser.id].mute;
	let kickInfo = kick[hUser.id].kick
	let banInfo = ban[hUser.id].ban;

	let warnLVLEmbed = new Discord.RichEmbed()
		.setColor("#FFA500")
		.addField("Warnings", `${hUser} has a ${warnlevel} warning level \n${reasonlvl}`)
		.addField("Mutes", `${muteInfo}`)
		.addField("Kicks", `${kickInfo}`)
		.addField("Bans", `${banInfo}`);
		
	message.channel.send(warnLVLEmbed); 
	return;
	}else{
	if(!warns[wUser.id]) warns[wUser.id] = {
		warns: 0, 
		reason: ""
	};
	
	if(!kick[wUser.id]) kick[wUser.id] = {
		kick: "None"
	};
	
	if(!mute[wUser.id]) mute[wUser.id] = {
		mute: "None"
	};
	
	if(!ban[wUser.id]) ban[wUser.id] = {
		ban: "None"
	};
	
	let warnlevel = warns[wUser.id].warns;
	let reasonlvl = reason[wUser.id].reason;
	let muteInfo = mute[wUser.id].mute;
	let kickInfo = kick[wUser.id].kick
	let banInfo = ban[wUser.id].ban;
	
/* 	if(warnlevel, (err) => {
		if(warnlevel === 1) return message.channel.send({embed: {
			color: 15105570,
			description: `<@${wUser.id}> has 0 warnings`
		}});
	}); */
	let warnLVLEmbed = new Discord.RichEmbed()
		.setColor("#FFA500")
		.addField("Warnings", `<@${wUser.id}> has a ${warnlevel} warning level \n${reasonlvl}`)
		.addField("Mutes", `${muteInfo}`)
		.addField("Kicks", `${kickInfo}`)
		.addField("Bans", `${banInfo}`);
		
	message.channel.send(warnLVLEmbed);
	}
};

module.exports.help = {
	name: `${prefix}history`
}
