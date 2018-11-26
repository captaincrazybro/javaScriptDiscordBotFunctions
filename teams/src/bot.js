const botConfig = require("./botsettings.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let team = require("./commands/team.js");
let user = require("./commands/user.js");

/*bot.commands = new Discord.Collection();  
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
    jsfile.forEach((f, i) =>{
		let commandsCollection = new Discord.Collection();
		let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });*/
  
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setPresence({ status: 'online', game: { name: 'Super Paintball' } });
});

client.on('error', console.error);
bot.on('error', e => console.log(e))

bot.on("message", async message => {
	
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	let prefix = botConfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
  let tUser = message.guild.member(message.guild.members.get(args[0]));
    
  team.run(prefix,cmd,args,message,fs);
  user.run(prefix,cmd,args,message,fs);
	
  //let commandfile = bot.commands.get(cmd);After 
  //if(commandfile) commandfile.run(bot,message,args,cmd,fs);
	
});

bot.login(botConfig.token);