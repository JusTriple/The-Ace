module.exports = {
    
    name: 'davet',
    description: "Bu bir davet Komutudur",
    execute(message, args){

    if(message.member.roles.cache.has('414464002874408961') + ('460768391771324416'))
     message.channel.send('https://discord.gg/C5wzPGD')
  
      
     else {
         message.channel.send('Malesef Bu Komutu kullanamazsın!');
     }
    } 
    
}