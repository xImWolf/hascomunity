const Discord = require("discord.js");
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
	bot.user.setStatus("dnd");
    bot.user.setActivity(`!help - ${bot.users.size} members.`, {
	  url: "https://twitch.tv/wolfyyxd",
	  type: "STREAMING"
	});
});



bot.on("message", message => {

var giiid = "402499256591712257";
    if(!message.content.startsWith(prefix)) return;
if(blarray.includes(message.author.id)) {
  	message.channel.send(`Hi, **${message.author.tag}**! This bot works only on H-Community`);
  	return;
  };
    var args = message.content.substring(prefix.length).split(" ");
if(message.channel.type === "dm") {
message.channel.send("**Well hello there.**");
return;
}
    switch (args[0].toLowerCase()) {

// comenzi normale

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

case "say":
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No permission.");
  try {
  if(!args[0]) return message.channel.send("Submit a message");
  message.channel.send(args.join(" ").slice(1))
  }
  return;
  

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
