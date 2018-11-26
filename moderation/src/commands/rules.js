const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
let prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
	
	let rulesEmbed = new Discord.RichEmbed()
		.setColor("711cff")
		.setTitle("Mutinies Rules")
		.setDescription("While in the Mutinies Discord Server, @everyone @here must abide by the following rules: \n**Text Channels** \n1. No Racism or Discrimination \n2. No Inappropriate Discord Names \n3. No Flame Wars\n4. No DDos, Dox or Death threats \n5. Stay on-topic \n6. No excessive swearing \n7. No Spamming or excessive caps \n8. Keep chat PG (Nothing sexual or graphic) \n9. Do not disclose personal information in chat \n10. No promotion or advertising of unrelated goods or servers \n11.  No Trolling and be respectful \n12. Excessive mention of @Staff will not be tolerated \n13. Obey staff orders \n14. Do not attempt to bypass filters \n15. Do not impersonate staff members \n16. Use common sense. If something is mostly unacceptable if you say it in person, do not post it here \n17. Be respectful when you talk to others \n18. No inappropriate usernames / nicknames \n**Voice Channels** \n1. No consistently obnoxious sounds \n2. No music bot abuse \n3. Do not play loud sounds intentionally \n4. Do not play inappropriate songs \n5. Be respectful when you talk to others \n6. Do not play inappropriate songs/videos in channels \n7. Do not disclose personal information in voice \n8. No promotion or advertising of unrelated goods or servers in voice \n\n**Failure to abide by these rules will result in warnings, mutes, kicks and bans being placed upon you**");

	message.channel.send(rulesEmbed);
}

module.exports.help = {
	name: `${prefix}rules`
}
