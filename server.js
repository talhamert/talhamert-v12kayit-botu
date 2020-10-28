const Discord = require('discord.js');
const client = new Discord.Client();//youtube.talhamert.com
const ayarlar = require("./ayarlar.json")
const moment = require('moment')
//youtube.talhamert.com
client.on('ready', async() => {
  console.log(`${client.user.tag} Adında giriş yapıldı!`);
});

client.on("guildMemberAdd", member => {
  let kur = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",//youtube.talhamert.com
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"//youtube.talhamert.com
    }
  client.channels.cache.get(ayarlar.hgkanal).send(ayarlar.hgmsg.replace("*katilantag*", member).replace("*toplamüye*", member.guild.memberCount).replace("*tarih*", `${moment(member.createdAt).format('DD')} ${kur[moment(member.createdAt).format('MM')]} ${moment(member.createdAt).format('YYYY h:mm:ss')}`).replace("*yetkiliroltag*", `<@&${ayarlar.kayityetkili}>`))
})

client.on("message", async message => {
  const args = message.content.split(" ")
  const command = message.content.toLowerCase().split(" ")[0]
  const command2 = command.slice(ayarlar.prefix.length)
  if(command === ayarlar.prefix+ayarlar.erkekkayitkomut){
    if(!message.member.roles.cache.has(ayarlar.kayityetkili)) {
      message.reply(ayarlar.yetkihatamsg)
      return;
    }
    if(!message.mentions.members.first()) {
      message.reply(ayarlar.hatalikullanimerkek)
      return//youtube.talhamert.com
    }
    if (!args[2] || !args[3]) {
      message.reply(ayarlar.hatalikullanimerkek)
      return
    }
    if(!isNaN(args[2])) {
      message.reply(ayarlar.hatalikullanimerkek)
      return;
    }
    if(isNaN(args[3])) {
      message.reply(ayarlar.hatalikullanimerkek)
      return;
    }
    message.mentions.members.first().setNickname(ayarlar.isimtaslak.replace("*yaş*", args[3]).replace("*isim*", args[2]))
    message.channel.send(ayarlar.erkekbasarili)
    message.mentions.members.first().roles.add(ayarlar.erkekrolid)
  } else if(command === ayarlar.prefix+ayarlar.kadinkayitkomut){
    if(!message.member.roles.cache.has(ayarlar.kayityetkili)) {
      message.reply(ayarlar.yetkihatamsg)
      return;
    }
    if(!message.mentions.members.first()) {
      message.reply(ayarlar.hatalikullanimkadin)
      return//youtube.talhamert.com
    }
    if (!args[2] || !args[3]) {
      message.reply(ayarlar.hatalikullanimkadin)
      return
    }//youtube.talhamert.com
    if(!isNaN(args[2])) {
      message.reply(ayarlar.hatalikullanimkadin)
      return;
    }
    if(isNaN(args[3])) {
      message.reply(ayarlar.hatalikullanimkadin)
      return;
    }
    message.mentions.members.first().setNickname(ayarlar.isimtaslak.replace("*yaş*", args[3]).replace("*isim*", args[2]))
    message.channel.send(ayarlar.kadinbasarili)
    message.mentions.members.first().roles.add(ayarlar.kadinrolid)
  } else if (command === ayarlar.prefix+ayarlar.saykullanim) {
    const tarih =  message.guild.createdAt
    let kur = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",//youtube.talhamert.com
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",//youtube.talhamert.com
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",//youtube.talhamert.com
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
    }
    const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setAuthor(message.guild.name)
    .addField("Kuruluş Tarihi;", `${moment(message.guild.createdAt).format('DD')} ${kur[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY h:mm:ss')}`)
    .addField("Erkek Sayısı;", message.guild.members.cache.filter(x=>x.roles.cache.has(ayarlar.erkekrolid)).size)
    .addField("Kadın Sayısı;", message.guild.members.cache.filter(x=>x.roles.cache.has(ayarlar.kadinrolid)).size)
    .addField("Toplam Üye;", message.guild.memberCount)
    .addField("Tagdaki Üyeler;", message.guild.members.cache.filter(x=>x.user.username.includes(ayarlar.tag)).size)
    .setFooter(`TlhaMert Youtube Kanalı Kayıt Botu Altyapısıdır.`)//youtube.talhamert.com
    message.channel.send({embed: embed})//youtube.talhamert.com
  } else if (command === ayarlar.prefix+ayarlar.unregisterkomut) {
    if(!message.mentions.members.first()) {//youtube.talhamert.com
      message.reply(ayarlar.hataliunreg)
      return//youtube.talhamert.com
    }
    message.mentions.members.first().roles.cache.forEach(x=>{
      message.mentions.members.first().roles.remove(x.id);
    })
    message.mentions.members.first().setNickname(message.mentions.members.first().user.username)
    message.channel.send(ayarlar.unregbasarili)//youtube.talhamert.com
  }
})

client.login(ayarlar.token);