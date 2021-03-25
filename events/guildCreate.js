const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
exports.run = (client, message, params) => {

client.on('guildCreate', guild => {
	console.log(`${guild.name} adlı sunucuya katıldım!`)
})
}
