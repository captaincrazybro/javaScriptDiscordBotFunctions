const Discord = require("discord.js");
const ms = require("ms");
let team = require("../team.json");
let users = require("../users.json");
let test = "test";

module.exports.run = async (prefix,cmd,args,message,fs) => {
	
	if ((cmd == `${prefix}teams`) || (cmd == `${prefix}team` && args[0] == "list")){
		
		//Length
		var len = Object.keys(team).length;
		let length = len++;
		length ++;

		//Get teams
		let lenT = Object.keys(team).length;
		function getTeams(){
			var i = 1;
			var cont = "";
			do{
				if(team[i].name == "none"){
					
				} else {
					cont = cont + "\n" + team[i].name;
				}
				i++
			} while(i <= lenT)
			return cont
		}

		//Send Embed
		let listEmbed = new Discord.RichEmbed()
		.setColor("RED")
		.setTitle("List of Teams")
		.setDescription(getTeams());
		message.channel.send(listEmbed);
		
	} else if(cmd == `${prefix}team`){
        if (!args[0]) {
            return message.channel.send(":x: Please specify which team you would like to view");
        }
        else if(args[0] == "create"){
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: Please specify an existing team");
            if(!args[1]) return message.channel.send(":x: Please specify the name of the team");
            if(args[1] == "create" || args[1] == "delete" || args[1] == "remove" || args[1] == "list") return message.channel.send(":x: This is not a valid team name");
            if(!team[1]){
                var len = 1;
                var length = 1;
            } else {
                var len = Object.keys(team).length;
                var length = len++; 
                length++;
            }

            for(i = 1; i < len; i++){
                if(team[i].name == args[1]){
                    return message.channel.send(":x: This team already exists");
                }
            }
            team[length] = {
                name: `${args[1]}`
            }
            fs.writeFile("./team.json", JSON.stringify(team), (err) => {
                if (err) console.log(err);
            }); 
            message.channel.send(`:white_check_mark: Successfully created team with name ` + args[1]);
        } else if(args[0] == "remove" || args[0] == "delete") {

            //Sender Check
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: Please specify an existing team");

            //Args[1] check
            if(!args[1]) return message.channel.send(":x: Please specify the name of the team");
             
            //Length
            var len = Object.keys(team).length; 
            var length = len++;
            length++;

            //Check if team doesn't exist
            let LenT = Object.keys(team).length; 
            LenT++;
            for(i = 1; i < LenT; i++){
                if(team[i].name == args[1]){
                    var teamCheck = "no";
                    var teamNumber = i;
                } else if (i <= LenT && teamCheck != "no"){
                    var teamCheck = "yes";
                }
            }
            
            if(teamCheck == "yes") return message.channel.send(":x: This team does not exist");

            //Delete team
            delete team[teamNumber];

            //Apply to fs
            fs.writeFile("./team.json", JSON.stringify(team), (err) => {
                if (err) console.log(err);
            });

            //Send Success message
            message.channel.send(`:white_check_mark: Successfully deleted team with name ` + args[1]);

        } else {
            let len = Object.keys(team).length;
            len++
            function checkTeam(){
                let i = 1;
                do {
                    if(team[i].name == args[0]){
                        var out = "yes";
                    } else if (out != "yes"){
                        var out = "no";
                    }
                    i++
                } while (i < len)
                return out;
            }
            if(checkTeam() == "no") return message.channel.send(":x: This team does not exist");
            let lenU = Object.keys(users).length;
            function getRoster(){
                var i = 1;
                var cont = "";
				var roles = "";
                do{
                    if(users[i].team == args[0]){
                        if(users[i].role){
                             if (users[i].role == "teamleader"){
                                roles = roles + "\n" + users[i].name + " :crown:";
                             }
                        } else {
                            cont = cont + "\n" + users[i].name;
                        }
                    }
                    i++
                } while(i <= lenU)
                if(!roles){
					cont = cont;
				} else {
					cont = roles + cont;
				}
				return cont;
            }
            let teamEmbed = new Discord.RichEmbed()
                .setColor(`RED`)
                .setTitle(args[0])
                .setDescription(getRoster());

            message.channel.send(teamEmbed);
        }

    }

}