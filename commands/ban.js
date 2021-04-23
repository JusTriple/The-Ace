module.exports = {


    name: 'ban',
    description: "Etiketlediğin Kişiyi Sunucudan Banlar!",
    execute(message, args){



        if (msg.member.hasPermission("BAN_MEMBERS")) {
         if (msg.members.mentions.first()) {
                try {
                    msg.members.mentions.first().ban();
                } catch {
                    msg.reply("I do not have permissions to ban" + msg.members.mentions.first());
            }elseif 
                msg.reply("You do not have permissions to ban" + msg.members.mentions.first());
            }
}
        }  
    }