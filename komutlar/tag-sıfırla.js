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

    message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Tag Sıfırlama').setDescription('Tagı Sıfırlamak İstediğinize Emin Misiniz ?').setFooter('Emin İseniz Lütfen " evet " Yazınız.'))
    .then(() => {
    message.channel.awaitMessages(response => response.content === 'evet', {
    max: 1,
    time: 30000,
    errors: ['time'],
    })
    .then((collected) => {
         message.member.send(`Tag Sıfırlama İsteği Başarılı ! Tagınız Sıfırlandı`)

                     
         
      


const embed = new Discord.MessageEmbed()
.setColor(`GREEN`)
.setTitle(`Durum Başarılı !`)
.setDescription(`Tagınız Başarı İle Sıfırlandı !`, `Tagınız **Sıfırlanmış.**`, true)
.setFooter(`Riâ • Community`)
.setTimestamp()
 message.channel.send(embed)
server.delete(`tag_${message.guild.id}`)
})}) 
}

exports.conf = {
    enabled: true,
    aliases: ["tag-sıfırla"],
    guildOnly: false,
    permLevel: 0
  };
  
  exports.help = {
    name: 'tagsıfırla'
  };