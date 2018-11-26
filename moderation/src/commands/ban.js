const Discord = require("discord.js");
const ms = require("ms");
let fs = require("fs");
let ban = require("../banhistory.json");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	let bUser = message.guild.member(message.mentions.users.first() || args[0]);
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x:" + " ***You do not have permission to execute this command***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	if(!bUser) return message.channel.send(":x:" + " ***I can't fine that user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});c
	if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***This user can not be banned!***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let banChannel = message.guild.channels.find(`name`, "logs");
	if(!banChannel) return message.channel.send(":x:" + " ***I can't find this channel***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
 	if(args.length === 1){
		
	let bReason = args.slice(1).join(" ");
	
	if(!bReason) return message.channel.send(":x:" + " ***Please specify a reason***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
	let banEmbed = new Discord.RichEmbed()
		.setDescription("PermBan")
		.setColor("RED")
		.addField("Banned User", `${bUser} with ID: ${bUser.id}`)
		.addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Banned In", message.channel)
		.addField("Time", message.createdAt)
	
	message.guild.member(bUser).ban(bReason);
	banChannel.send(banEmbed);
	message.delete().catch(O_o=>{});
	message.channel.send(":white_check_mark: ***" + `${User}` + "*** ***has been banned***");

 	if(!ban[bUser.id]) ban[bUser.id] = {
		ban: `\n- Banned for ${bReason}`
	} 
	if(ban[bUser.id].ban === "None"){
		ban[bUser.id].ban = `\n- Banned for ${bReason}`;
	}else{
		let banInfo = ban[bUser.id].ban;
		ban[bUser.id] = {
			ban: `${banInfo} \n- Banned for ${bReason}`
		}
	}
		
    fs.writeFile("./banhistory.json", JSON.stringify(ban), (err) => {
        if (err) console.log(err);
    });
	
	}else{ 
		
	let bantime = args[1];
	let bReason = args.slice(2).join(" ");	
		
	if(!bReason || !bantime) return message.channel.send(":x:" + " ***Please specify a reason and/or a time***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
		
	let banTEmbed = new Discord.RichEmbed()
		.setDescription("TempBan")
		.setColor("RED")
		.addField("Banned User", `${bUser} with ID: ${bUser.id}`)
		.addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Banned In", message.channel)
		.addField("Time", message.createdAt)
		.addField("How Long", bantime)
		.addField("Reason", bReason); 	
			
	message.guild.member(bUser).ban(bReason);
	message.channel.send(":white_check_mark: ***" + `${bUser}` + "*** ***has been banned***");
			
	setTimeout(function(){
		message.guild.unban(bUser); 
		banChannel.send(":white_check_mark: ***" + `${bUser}` + "*** ***has been unbanned***");
	}, ms(bantime));
	banChannel.send(banTEmbed);
	
	
 	if(!ban[bUser.id]) ban[bUser.id] = {
		ban: `\n- Banned ${bantime} for ${bReason}`
	} 
	if(ban[bUser.id].ban === "None"){
		ban[bUser.id].ban = `\n- Banned ${bantime} for ${bReason}`;
	}else{
		let banInfo = ban[bUser.id].ban;
		ban[bUser.id] = {
			ban: `${banInfo} \n- Banned ${bantime} for ${bReason}`
		}
	}
		
    fs.writeFile("./banhistory.json", JSON.stringify(ban), (err) => {
        if (err) console.log(err);
    }); 
	}
}

module.exports.help = {
	name: `${prefix}ban`
}
