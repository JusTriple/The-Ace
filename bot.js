const { settings } = require('cluster');
const { ENGINE_METHOD_PKEY_ASN1_METHS } = require('constants');
const Discord = require('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]})


const prefix = '!';

const fs = require('fs');
const { execute, description } = require('./commands/sa');




client.commands= new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready' , () => {
    console.log('The Ace is Online!');
    client.user.setActivity('Eğer Bir Hata Bulursanız Lütfen Bildiriniz!',  { type: 'PLAYING'}) 
});

client.on('message', message =>{
  message.member.roles.cache.has
    if(!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(" ");
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  switch (args[0]) {
      case 'nuke':
        if(!message.member.hasPermission("ADMINISTRATOR")){
          return message.reply("Bu Komudu Kullanmak içinYeterli yetkiye sahip Değilsin!");
        }
          let filter = m => m.author.id === message.author.id
          message.channel.send('Kanalın Nukelenmesini İstiyorumusun? (Evet | Hayır)')
          message.channel.awaitMessages(filter, {
              max: 1,
              time: 200000,
              errors: ['time']
          })
              .then(message => {
                  message = message.first()
                  if (message.content.toLowerCase() == 'evet' || message.content.toUpperCase() == 'y') {
                      let channel = client.channels.cache.get(message.channel.id)
                      let posisi = channel.position
                      channel.clone().then((channel2) => {
                          channel2.setPosition(posisi)
                          channel.delete()
                          channel2.send("**Kanal Nukelendi!** https://media1.tenor.com/images/945193324b8ec04467203e3d9fe1a31f/tenor.gif?itemid=16286228")
                      })
                  } else if (message.content.toLowerCase() == 'hayır' || message.content.toLowerCase() == 'n') {
                      return message.channel.send("Nuke İptal Edildi!")
                  } else {
                      return message.channel.send(`Yanlış Cevap!`)
                  }
              })
              .catch(collected => {
                  message.channel.send('Zaman Doldu!');
              });

  }


  if (message.content.startsWith(`${prefix}lockdown`)) {
    if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply('Maalesef Bu Komudu Kullanamazsın!')
    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
    if (args[1] === 'on') {
        channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            }).then(() => {
                channel.setName(channel.name += `🔒`)
            })
        })
        return message.channel.send('Kanallar Başarıyla Kitlendi');
    } else if (args[1] === 'off') {
        channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true
            }).then(() => {
                channel.setName(channel.name.replace('🔒', ''))
            })
        })
        return message.channel.send('Bütün Kanallar Başarıyla Açıldı!')
    }
}


if (message.content.startsWith(`${prefix}meme`)) { 
  const https = require('https');
  const Discord = require('discord.js');
  const url = 'https://www.reddit.com/r/meme/hot/.json?limit=100'


  https.get(url, (result) => {
    var body = ''
    result.on('data', (chunk) => {
        body += chunk
    })

    result.on('end', () => {
        var response = JSON.parse(body)
        var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

        if (index.post_hint !== 'image') {

            var text = index.selftext
            const textembed = new Discord.MessageEmbed()
                .setTitle(subRedditName)
                .setColor(9384170)
                .setDescription(`[${title}](${link})\n\n${text}`)
                .setURL(`https://reddit.com/${subRedditName}`)

            message.channel.send(textembed)
        }

        var image = index.preview.images[0].source.url.replace('&amp;', '&')
        var title = index.title
        var link = 'https://reddit.com' + index.permalink
        var subRedditName = index.subreddit_name_prefixed

        if (index.post_hint !== 'image') {
            const textembed = new Discord.RichEmbed()
                .setTitle(subRedditName)
                .setColor(9384170)
                .setDescription(`[${title}](${link})\n\n${text}`)
                .setURL(`https://reddit.com/${subRedditName}`)

            message.channel.send(textembed)
        }
        console.log(image);
        const imageembed = new Discord.MessageEmbed()
            .setTitle(subRedditName)
            .setImage(image)
            .setColor(9384170)
            .setDescription(`[${title}](${link})`)
            .setURL(`https://reddit.com/${subRedditName}`)
        message.channel.send(imageembed)
    }).on('error', function (e) {
        console.log('Got an error: ', e)
    })
})



}




if (message.content.startsWith(`${prefix}av`)) {
  const avatar = message.mentions.users.first()
  if(!avatar) return message.channel.send(message.author.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 512
  }))
  else message.channel.send(displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 512
  }))
}



client.on("message", message => {
  if (message.content.startsWith(prefix + "love")) {
      if(!message.mentions.members.first()) return message.channel.send(`Bu Komudu Kullanmak için Birini Etiketleyiniz!`).then(message.react('❌'));
      let args = message.content.slice(prefix.length).split(/ +/)
      let person = message.mentions.members.first(message, args[0]);

      if(!person || message.author.id === person.id ) {
        person = message.guild.members
        .filter(m => m.id !== message.author.id)
        .random();
      }

      const love = Math.random() * 100;
      const loveIndex = Math.floor(love / 10);
      const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
      
      let loveEmbed = new Discord.MessageEmbed()
      .setTitle("Aşk Durumu")
      .setDescription(`${message.author}  ${person} Adlı Kişiyi ${love}%\n\n${loveLevel} Kadar Seviyor `)
      message.channel.send(loveEmbed)
  }
})





switch(args[0]){
  case 'nuke11':
let filter = m => m.author.id === message.author.id
message.channel.send('Bu Kanalı Nukelemek İstediğine Eminmisin?')
message.channel.awaitMessages(filter, {
  max: 1,
  time: 20000,
  errors: ['time']
})
 .then(message => {
   message = message.first()
   if(message.content.toLowerCase() == 'yes' || MSMediaKeyMessageEvent.content.toLowerCase() == 'n'){
     let channel = bot.channels.cache.get(message.channel.id)
     let posisi = channel.position
     channel.clone().then((channel2) => {
       channel2.setPosition(posisi)
       channel.delete()
       channel2.send('Channel Nuked!')
     })

   } else if (message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'n'){
     return message.channel.send('İptal Edildi')
   }
 })
 .catch(collected => {
   message.channel.send('Çok zaman Geçti, İptal edildi!')
 })
    
  
}


switch(args[0]){
  case 'öp':

const taggedUser = message.mentions.users.first();
     

if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

  const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiyi Öptün!` )
    .setColor(0x11FF84)
    .setImage('https://media1.tenor.com/images/77c5aa25f2d5bbf84afdcf072eb7ac6c/tenor.gif?itemid=7549151') 
   
    
     message.channel.send(embed);

}

switch(args[0]){
  case 'kahkaha':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiye Kahkaha Attın` )
    .setColor(0x11FF84)
    .setImage('https://media1.tenor.com/images/a2794207f35d5112497a629e5a5182bd/tenor.gif?itemid=12694732')

   
    
     message.channel.send(embed);

}


switch(args[0]){
  case 'intihar':


const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(`Görüşürüz ${message.author.username}` )
    .setColor(0x11FF84)
    .setImage('https://media1.tenor.com/images/b25511087b27597960f77dd0dbaf568d/tenor.gif?itemid=5140737')

   
    
     message.channel.send(embed);

}





switch(args[0]){
  case 'ban':

const taggedUser = message.mentions.users.first();
    
if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions").then(message.react('❌'))
let User = message.guild.member(message.mentions.users.first())
if (!User) return message.channel.send("Böyle Bir Kullanıcı Mevcut Değil!").then(message.react('❌'))
if (!User.hasPermission("BAN_MEMBERS")) return message.reply("Malesef Botun Yetkisi Bunu Yapmak için Yeterli Değil Bota Yönetici Rolünü Vererek Yeniden Deneyebilirsin!").then(message.react('❌'))
let banReason = args.join(" ").slice(22);
if (!banReason) {
  banReason = "None"
}

User.ban({reason: banReason})

const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(`${taggedUser.username} Adlı Kişiyi Banladın!`)
    .addField(`${taggedUser.username} Sunucudan  ` ,  `${message.author} Adlı Kişi Tarafından Banlandı`)
    .setColor(0x11FF84)
   
    
     message.channel.send(embed);

}

switch(args[0]){
  case 'tokatat':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiye Tokat Attın!` )
    .setColor(0x11FF84)
    .setImage('https://media1.tenor.com/images/ab74104330dbb2e4a8176e9ddaf5a8d1/tenor.gif?itemid=17933922')

   
    
     message.channel.send(embed);

}





switch(args[0]){
  case 'sik':
   
      
const taggedUser = message.mentions.users.first();


 if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌')) 
  
  .then(msg => {
    msg.delete({ timeout: 10000 })
    
  })


}                 
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiyi Siktin` )
    .setColor(0x11FF84)
    .setImage('https://media1.tenor.com/images/1faaa0600c731b86736a2aa6570fbca2/tenor.gif?itemid=17227304')

   
    
     message.channel.send(embed);

}


switch(args[0]){
  case 'invite':



                
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(`Invite Linkim ----> https://discord.com/api/oauth2/authorize?client_id=765138003588284476&permissions=8&scope=bot` )
    .setColor(0x11FF84)
    .setImage('https://www.wallpaperup.com/uploads/wallpapers/2012/09/05/12712/c3191a80261e657e89a146a4c9b461ed-187.jpg')
    .setFooter('• The Ace Tüm Haklar Saklıdır ')
    .setTimestamp()
   
    
     message.channel.send(embed);

}






switch(args[0]){
  case 'nahçek':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌')) 
  .then(msg => {
    msg.delete({ timeout: 10000 })
  })


}                 
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiye Nah çektin!` )
    .setColor(0x11FF84)
    .setImage('https://media1.tenor.com/images/b04254eec0ca1a3cddd9f570a3687b30/tenor.gif?itemid=17077586')

   
    
     message.channel.send(embed);

}
switch(args[0]){
  case 'banla':

    class GuildMemberManager extends BaseManager {
    constructor(guild, iterable) {
      super(guild.client, iterable, GuildMember);
      this.guild = guild;

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!')

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
    guild.members.ban(` ${taggedUser.username}`)
    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username}` , )
    .setColor(0x11FF84)
    .setImage('https://media3.giphy.com/media/Lb3vIJjaSIQWA/source.gif')

   
     message.channel.send(embed);
}
  }  }

switch(args[0]){
  case 'sarıl':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiye Sarıldın!` )
    .setColor(0x11FF84)
    .setImage('https://media3.giphy.com/media/Lb3vIJjaSIQWA/source.gif')

   
    
     message.channel.send(embed);

}





switch(args[0]){
  case 'yumrukat':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiye Yumruk Attın!` )
    .setImage('https://media.tenor.com/images/81b64d364f1b41207c890d576267c8d3/tenor.gif')
    .setColor(0x11FF84)
   
    
     message.channel.send(embed);

}
switch(args[0]){
  case 'hackle':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiyi Hackledin!` )
    .setImage('https://media0.giphy.com/media/kJ1iL1ZQIyibu/giphy.gif?cid=ecf05e479e5c3ebeb1d756c1c9bba395c3495a1b9dd42e0b&rid=giphy.gif')
    .setColor(0x11FF84)
   
    
     message.channel.send(embed);

}

switch(args[0]){
  case 'danset':

    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    .setTitle(`Dans Ettin!` )
    .setImage('https://media.tenor.com/images/0cd22c693e345f73ccc1033ab202fd94/tenor.gif')
    .setColor(0x11FF84)
   
    
     message.channel.send(embed);

} 
var serverIcon = message.guild.iconURL();

switch(args[0]){
  case 'üyesayısı':
    const Discord = require("discord.js")
 const embed = new Discord.MessageEmbed()
 .setTitle(`${message.guild.name}`)
 .addField(`Üye Sayısı: ${message.guild.memberCount}`, `${message.guild.memberCount} Kişi Bu Sunucuda Yer Alıyor!`)
 .addField("Çevrimdışı üye sayısı",message.guild.members.cache.filter(m => m.user.bot && m.user.presence.status !== "offline").size)
 .setThumbnail(serverIcon)
  message.channel.send(embed)
 }

 switch(args[0]){
 case 'fal':
  if(args[1] === 'bak'){
    message.channel.send('Senin Falın ----->'); var random = Math.floor(Math.random() * 6) + 1
      if(random == 6) message.channel.send('Kalbin güm güm atıyor, ciğerlerine oksijen dolup karbondioksit çıkıyor, kulakların duymadığın sesleri duyuyor, gözlerinde çok iyi görüyor. Sağlıklısın maşallah.')
      if(random == 5) message.channel.send ('Kafanın içinde düşündüğün bir şeyler var. Uzaklara bakarken gözlerinle bakıyorsun, konuşurken ağzını açıyorsun, bak bak ayaklarınla yürüyorsun.') 
      if(random == 4) message.channel.send('Sana bir haber gelecek ama sen kapıda, bacada pencere de bekleme, haber olmadık anda, olmadık yerde gelebilir, olmadı gelmeyebilir de.')
      if(random == 3) message.channel.send('Kısa bir süre içinde beklediğin bir yerden iyi bir haber alacaksın.')
      if(random == 2) message.channel.send('Karanlık bir gece geçireceksin ve ondan sonra güzel bir haber alacaksın.')
      if(random == 1) message.channel.send('Bir uzak bir kısa yolun var. Kısa yoldan gidersen ite dalanırsın, uzak yoldan gidersen çalıya dolanırsın en güzeli sen evde otur.')
         
  }else{
      message.channel.send('Komudu Kullanmak için Komutdan Sonra "bak" Yazman Gerekiyor!')
  }
 }





 


switch(args[0]){
  case 'öldür':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiyi Öldürdün!` )
    .setImage('https://media1.tenor.com/images/14e9f1bf7efa6b940ded24934cc39054/tenor.gif?itemid=15642482')
    .setColor(0x11FF84)
   
    
     message.channel.send(embed);

}


switch(args[0]){
  case 'tekmeat':

const taggedUser = message.mentions.users.first();
     
if (!message.mentions.users.size) {
  return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!').then(message.react('❌'))

  .then(msg => {
    msg.delete({ timeout: 10000 })
  })

}
const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
    .setTitle(` ${taggedUser.username} Adlı Kişiye Tekme Attın!` )
    .setImage('https://media1.tenor.com/images/74421a2b5525c55f1d8f1bf3b0a9dd64/tenor.gif?itemid=16700529')
    .setColor(0x11FF84)
   
    
     message.channel.send(embed);

}


switch(args[0]){
  case 'yetkili':
    const Discord = require("discord.js")
 const embed = new Discord.MessageEmbed()
 .setTitle('Yetkili Komutları')
 .addField('!ban', 'Komutunu Kullanarak Birini Sunucudan Banlayabilirsin!')
 .addField('!üyesayısı', 'Komutunu Kullanrak Sunucudaki Üye Sayısına Bakabilirsin!')
 .addField('!clearchat', 'Komutunu Kullanarak Sunucudaki Son 100 Mesajı Silebilirsin!')
 .setFooter('• The Ace Tüm Haklar Saklıdır ')
 .setTimestamp()
 .addField('The ACE Kurucusu JusTriple ', 'İyi Eğleceler Diler!')
 .setColor(0x000000 )

 .setImage('https://www.wallpaperup.com/uploads/wallpapers/2012/09/05/12712/c3191a80261e657e89a146a4c9b461ed-187.jpg')
 
  message.channel.send(embed)
 }








var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can\'t use that!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('You didn\'t mention anyone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('They aren\'t in the server!');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('You need to give a reason!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var log = new Discord.MessageEmbed()
    .setTitle('User Warned')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were warned!')
    .setDescription(reason);

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.channel.send(`**${user}** has been warned by **${msg.author}**!`);
}





switch(args[0]){
  case 'eğlence':
 const embed = new Discord.MessageEmbed()
 .setTitle('Eğlence Komutları')
 .addField('!yumrukat', 'Komutunu Kullanarak Birine Yumruk Atabilirsin!')
 .addField('!tekmeat', 'Komutunu Kullanarak Birine Tekme Atabilirsin!')
 .addField('!sarıl', 'Komutunu Kullanarak Birine Sarılablirsin!')
 .addField('!nahçek', 'Komutunu Kullanarak El Hareketi Çekebilirsin!')
 .addField('!öldür', 'Komutunu Kullanarak Birini Vurabilirsin!')
 .addField('!danset', 'Komutunu Kullanarak Dans Edebilirsin!')
 .addField('!hackle', 'Komutunu Kullanarak Birini Hackleyebilirsin!')
 .addField('!tokatat', 'Komutunu Kullanarak Birine Tokat Atabilirsin!')
 .addField('!öp', 'Komutunu Kullanarak Birini Öpebilirsin')
 .addField('!aşkölçer', 'Komutunu Kullanarak Biri İle Arandaki Aşkı Ölçebilirsin!')
 .addField('!fal', 'Komutunu Kullanarak Falına Bakabilirsin!')
 .addField('!sa', 'Komutunu Kullanarak Botla Selamlaşabilirsin! ')
 .setFooter('• The Ace Tüm Haklar Saklıdır ')
 .setTimestamp()
 .addField('The ACE Kurucusu JusTriple ', 'İyi Eğleceler Diler!')
 .setColor(0x000000 )

 .setImage('https://www.wallpaperup.com/uploads/wallpapers/2012/09/05/12712/c3191a80261e657e89a146a4c9b461ed-187.jpg')
 
  message.channel.send(embed)
 }

 const taggedUser = message.mentions.users.first();
 switch(args[0]){
  case 'hatabildir':
 const embed = new Discord.MessageEmbed()
 .setTitle('THE ACE')
 .addField(`Hataları Bildirmek için THE ACE'in Kurucusu olan @ᴊᴜꜱᴛʀɪᴘʟᴇ#4004 'e DM'den Ulaşabilirsin`, `Her Zaman Önerilere Açığım!`)
 .setColor(0x000000 )

 .setImage('https://cdn.hipwallpaper.com/i/70/80/r0kziD.jpg')
 
  message.channel.send(embed)
 
 }

 

 


 switch(args[0]){
  case 'bilgi':
 const embed = new Discord.MessageEmbed()
 .setTitle('THE ACE')
 .addField('•Merhaba benim adım The Ace ve JusTriple Tarafından Kuruldum Unutma ki Ben Sadece 1 kişi Tarafından Kuruldum o yüzden', 'Herhangi Bir Hata İle Karşılaşırsan')
 .addField('!hatabildir', 'Komutunu Kullanabilirsin!')
 .addField('!eğlence', 'Komutu ile Eğlenceli Komutları Görüntülüyebilirsin!')
 .addField('!yetkili', 'Komutu ile Yetkili Komutlarını Görüntülüyebilirsin!')
 .addField('» Bağlantılar', 'https://discord.js.org/#/docs/main/stable/general/welcome')
 .addField('The Ace Kurucusu JusTriple ', 'İyi Eğleceler Diler!')
 .setImage('https://www.wallpaperup.com/uploads/wallpapers/2012/09/05/12712/c3191a80261e657e89a146a4c9b461ed-187.jpg')
 .setFooter('• The Ace Tüm Haklar Saklıdır ')
 .setTimestamp()
 .setColor(0x000000 )


 
  message.channel.send(embed)
 }

const command = args.shift().toLowerCase();
   
if (command == 'flip'){
  let coins = parseInt(args[0]);

  if (!args[0]) {
    let rand = Math.floor(Math.random() * 2);

    if (rand == 0) {
      message.channel.send("Tura");
    } else if (rand == 1) {
      message.channel.send("Yazı");
    }
  } else if (coins < 2 || coins > 15) {
    message.reply("Please enter a number between 2 and 15");
  } else {
    let numOfHeads = 0;
    let numOfTails = 0;

    let allCoins = [];
    for (let i = 0; i < coins; i++) {
      let rand = Math.floor(Math.random() * 2);

      if (rand == 0) {
        allCoins.push("Tura");
        numOfHeads++;
      } else if (rand == 1) {
        allCoins.push("Yazı");
        numOfTails++;
      }
    }
    message.channel.send(allCoins);
    message.channel.send(
      `You got ${numOfHeads} Heads, and ${numOfTails} Tails`
    );
  }

}





});

client.login('NzY1MTM4MDAzNTg4Mjg0NDc2.X4QcSw.VOrqmcA4XWMZPl6ganIGYq2M_kc')
