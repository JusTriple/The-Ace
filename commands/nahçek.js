const { User } = require("discord.js");

module.exports = {


    name: 'nahçek',
    description: "Nahçeker",
    execute(message, args){
      const taggedUser = message.mentions.users.first();
     
      if (!message.mentions.users.size) {
        return message.reply('Malesef işe Yaramadı , Birini Etiketleyip Komudu Tekrar Kullanmayı Deneyebilirsin!');
    }

      message.channel.send(` ${taggedUser.username} Adlı Kişiye Nah çektin!
`); message.channel.send('https://tenor.com/view/nah-hareket-t%C3%BCrk-anemik-vampir-gif-18520238')

    }
}