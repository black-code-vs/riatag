const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('megadb')
let server = new db.crearDB('server')
require('./util/eventLoader')(client);


var prefix = ayarlar.prefix;



const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

  
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};





client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.on("guildMemberAdd", async member => {
let username = member.user.username;
let tag2 = await server.get(`tag_${member.guild.id}`)

member.send(new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`Dostum Sunucumuzda Bir Tag Var ! \n O Tagı Alarak Bizi Mutlu Edebilirsin ! \n Tagımız : ${tag2}`)
.setFooter(`Riâ • Community`)
.setTimestamp()

)
  member.setNickname(`${tag2} ${username}`)
})
client.login(ayarlar.token);



client.on("userUpdate", async (old,nev) => {
  if (old.username !== nev.username){
    const Tag = "ﾁ"
    const Ria = "812852933963939843"
    const Server = "812852933963939842"
    const Log = "812852938304782399"
    if (!nev.username.includes(Tag) && client.guilds.get(Server).members.get(nev.id).roles.has(Ria)) {
      client.guilds.get(Server).members.get(nev.id).removeRole(Ria)
      client.channels.get(Log).send(`> **${nev}, "${Tag}" Tagımızı Çıkardığın İcin Botumuz Tarafından  <@&812852933963939843> Rölü Geri Alındı** `)
      nev.send("Tagımızı Çıkardığına Üzüldüm :(")
      }
        if (nev.username.includes(Tag) && client.guilds.get(Server).members.get(nev.id).roles.has(Ria))
      {
      client.channels.get(Log).send(`> **${nev}, "${Tag}" Tagımızı Aldiğın İcin Botumuz Tarafından Başarıyla  <@&812852933963939843> Rölü Verildi** `)
      client.guilds.get(Server).members.get(nev.id).addRole(Ria)
      nev.send("Tagımızı Aldığın İçin Çok Mutluyuz <3")
    }
}
})

// BOTU ODAYA SOKAR.

client.on('ready', ()=>{
client.channels.get('824704273572167805').join()
  }) //Cagin.
