const Discord = require('discord.js');
const db = require('megadb');
let server = new db.crearDB('server');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('BAŞARISIZ !')
    .setDescription(`Bu Komutu Kullanmak İçin Yetkin Yok !`, `Gerekli Yetki **YÖNETİCİ**`, true)
    .setFooter(`Riâ • Community`)
.setTimestamp()
    )
let tag2 = args.slice().join(' ')

if (!tag2) return message.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setTitle(`BİR HATA BELİRDİ !`)
.setDescription(`Bir Tag Girmelisin !`)
.setFooter(`Riâ • Community`)
.setTimestamp()
)


const embed = new Discord.MessageEmbed()
.setColor(`GREEN`)
.setTitle(`Durum Başarılı !`)
.setDescription(`Tagınız Başarı İle Ayarlandı !`, `Tagınız **${tag2}**`, true)
.setFooter(`Riâ • Community`)
.setTimestamp()
message.channel.send(embed)

server.set(`tag_${message.guild.id}`, tag2)
}

exports.conf = {
    enabled: true,
    aliases: ["tag-ayarla"],
    guildOnly: false,
    permLevel: 0
  };
  
  exports.help = {
    name: 'tagayarla'
  };