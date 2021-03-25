const Discord = require('discord.js');
const db = require('megadb');
let server = new db.crearDB('server');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {


const Embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`Yardım Menüsü`)
.addField(`Tag Ayarlamak İçin`, `.tag-ayarla`, true)
.addField(`Tag Sıfırlamak İçin`, `.tag-sıfırla`, true)
.setFooter(`Riâ • Community`)
.setTimestamp()
return message.channel.send(Embed)
}

exports.conf = {
    enabled: true,
    aliases: ["help"],
    guildOnly: false,
    permLevel: 0
  };
  
  exports.help = {
    name: 'yardım'
  };