const Discord = require("discord.js");
const fs = require("fs");
let mute = require('../mutehistory.json'); 		

module.exports.run = async (mUser, mutetime, mReason) => { 

		if(!mute[mUser.id]) mute[mUser.id] = {
			mute: `Muted ${mutetime} for ${mReason}`
		} 
		if(mute[mUser.id].mute === "None"){
			mute[mUser.id].mute = `Muted ${mutetime} for ${mReason}`; 
		}else{
			let muteInfo = mute[mUser.id].mute;
			mute[mUser.id] = {
				mute: `${muteInfo} \nMuted ${mutetime} for ${mReason}`
			}
		}
		
		fs.writeFile("./mutehistory.json", JSON.stringify(mute, muteNumber), (err) => {
			if (err) console.log(err);
		});	
}

module.exports.help = {
	name: "muteString"
}