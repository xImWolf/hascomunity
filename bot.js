﻿const Discord = require("discord.js");
var weather = require("weather-js");
const bot = new Discord.Client({autoReconnect: true});
const moment = require('moment');
const economy = require('discord-eco');
const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');
var talkedRecently = new Set();
//
var fs = require("fs");
var text = fs.readFileSync("./minecraft.txt").toString('utf-8');
var textByLine = text.split("\n")
// blacklist code jos:
let bltext = fs.readFileSync("./blacklist.txt").toString('utf-8');
let blarray = bltext.split("\n")
//
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
// spotify
var fs = require("fs");
var text = fs.readFileSync("./spotify.txt").toString('utf-8');
var alt = text.split("\n")
//
var getgeoip = require('ip-geoinfo');
var fs = require("fs");
var requireText = require('require-text');
let c = "#ff0000";
let prefix = "!";
bot.on("ready", () => {
	console.log(`Logged in as ${bot.user.tag}, ${bot.user.id}`);
	bot.channels.get("432085606609190912").send("bot loaded up");
	bot.user.setStatus("dnd");
    bot.user.setActivity(`${bot.users.size} users.`, {
	  type: "Listening"
	});
});



bot.on("message", message => {
if(message.author.bot) return;
if(message.channel.type === "dm") {
  message.author.send("Sent message **"+message.content.toString()+"** to the support!");
  var embed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .setDescription(message.content.toString())
  .setTitle("New message from "+message.author.tag, message.author.avatarURL)
  .setTimestamp()
  .setFooter("H-Community Mail System.")
  bot.channels.find("id", "449840938454482945").send({embed})
	return;
}
var giiid = "402499256591712257";
    if(!message.content.startsWith(prefix)) return;
if(blarray.includes(message.author.id)) {
  	message.channel.send(`Hi, **${message.author.tag}**! This bot works only on H-Community`);
  	return;
  };
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {

// comenzi normale

case "say":
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No permission");
try {
message.channel.send(args.join(" ").slice(3));
}
catch(err) {
message.channel.send(`\`\`\`${err}\`\`\``);
}
return;

case "minecraft":
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !minecraft again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var randomalt = textByLine[Math.floor(Math.random() * textByLine.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur minecraft alt, sir.`)
.setDescription(randomalt)
.setColor(c)
message.author.sendMessage({embed});
message.reply("check DMs.");
break;

case "spotify":
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !spotify again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var salt = alt[Math.floor(Math.random() * textByLine.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur spotify alt, sir.`)
.setDescription(salt)
.setColor(c)
message.author.sendMessage({embed});
message.reply("check DMs.");
break;
		    
case "serverinfo":
	try {
var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("» Name:", message.guild.name, true)
      .addField("» Owner:", message.guild.owner.user.username, true)
      .addField("» Server ID:", message.guild.id, true)
      .addField("» Owner ID:", message.guild.owner.id, true)
      .addField("» Members:", message.guild.memberCount, true)
      .addField("» Region:", message.guild.region, true)
      .addField('» Roles:', '' + message.guild.roles.map(r => r.name).join(', ') + '', true)
      .addField(`» Created at:`, `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
      .addField('» Security level:', message.guild.verificationLevel, true)
      .addField("» Channels:", `Text: ${message.guild.channels.filter(ch => ch.type === 'text').size}\nVoice: ${ message.guild.channels.filter(ch => ch.type === "voice").size}`, true)
      .setColor(c)
      .setFooter(moment.utc(message.channel.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
      .setThumbnail(message.guild.iconURL)
      message.channel.send({embed});
	}
	catch(err) {
	message.channel.send("An error occured: ```" + err + "```\nPlease contact the bot developer.");
return;
}
break;

};
});

bot.login(process.env.BOT_TOKEN);
