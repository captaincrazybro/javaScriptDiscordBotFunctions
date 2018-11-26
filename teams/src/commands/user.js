const Discord = require("discord.js");
const ms = require("ms");
const moj = require("mojang-api");
let team = require("../team.json");
let users = require("../users.json");

module.exports.run = async (prefix,cmd,args,message,fs) => {

    if (cmd == `${prefix}user`) {

        if (args[0] == "set"){

            if(!message.member.hasPermission("KICK_MEMBERS")) return;
            if(!args[1]) return message.channel.send(":x: Please specify the name of the user");
            if(args[1] == "set") return message.channel.send(":x: This is not a valid user name");
            //let date = new Date();
            //let curDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getSecond(), date.getMilliseconds());
            /*moj.nameToUuid(args[1], function(err, res) {
                if(err) return message.channel.send(":x: There are currently no players with this name");
                   try {
                        var test = res[0].id
                    } catch {
                        message.channel.send(":x: There are currently no players with this name");
                        throw new Error("No such player");
                    }
            });*/
            if(!args[2]) return message.channel.send(":x: Please specify which team this user is in");
            var lenT = Object.keys(team).length;
            var length = lenT++
            length++

            //Check for if player already exists

            function playCheck(){
                let lenU = Object.keys(users).length++;
                var i = 1;
                do{
                    if(users[i].name == args[1]){
                        var out = i;
                        var test = "yes";
                    } else if (/*i > Object.keys(users).length++ &&*/ (test != "yes" || !test)) {
                        var out = "no";
                    }
                    i++;
                } while (i <= lenU);
                return out;
            }
            function checkTeam(){
                let i = 1;
                do {
                    if(team[i].name == args[2]){
                        var out = "yes";
                    } else if (out != "yes"){
                        var out = "no";
                    }
                    i++
                } while (i < lenT)
                return out;
            }

            if(checkTeam() == "no" && args[2] != "none") return message.channel.send(":x: This team does not exist");
            
            if(playCheck() != "no"){
                var lentU = playCheck();
            }
            else if(!users[1]){
                var len = 1;
                var lentU = 1;
            } else {
                var len = Object.keys(users).length;
                var lentU = len;
                lentU++;
            }
            /*for(i = 1; i < len; i++){
                if(users[i].name == args[1]){
                    return message.channel.send(":x: This player already exists");
                }
            }*/
            users[lentU] = {
                name: args[1],
                team: args[2]
            }
            if(args[3] == "teamleader" || args[3] == "leader"){
                    users[lentU] = {
                        name: args[1],
                        team: args[2],
                        role: "teamleader"
                    }
            }
            fs.writeFile("./users.json", JSON.stringify(users), (err) => {
                if (err) console.log(err);
            }); 
            message.channel.send(":white_check_mark: Set " + args[1] + " with team " + args[2]);

        }
		
	}

}