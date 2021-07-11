const discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    
    var item = "";
    var time;
    var winnerCount;
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this!");
    
    winnerCount = args[0];
    time = args[1];
    item = args.slice(2,args.length).join(" ");
 
    if(!winnerCount) return message.reply("No player number given!");
    if(!time) return message.reply ("No time given!");
    if(!time) return message.reply ("Geen reward opgeven!");
    
    message.delete();
    
    var date = new Date().getTime();
    var dateEnd = Date(date + (time * 1000));
    
    var giveawayEmbed = new discord.MessageEmbed()
    	.setTitle("**Giveaway**")
    	.setFooter(`Expires on: ${dateEnd}`)
    	.setDescription(item);
    
    var embedSend= await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
    
    setTimeout(function() {
        
        var random = 0;
        var winners = [];
        var inList = false;
        
        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();
        
        for (let i = 0; i < peopleReacted.length; i++) {
            
            if(peopleReacted[i].id == client.users.id) {
                peopleReacted.slice(i,1);
                continue;
            }
            
        }
        
        if(peopleReacted.lenght == 0) {
            return message.channel.send("No one participated!");
        }
        
        if(peopleReacted.length < winnerCount) {
            return message.channel.send("Too few people participated!");
        }
        
        for (let y = 0; y < winnerCount; y++) {
            
            inList = false;
            
            random = Math.floor(Math.random() * peopleReacted.length);
            
            for (let o = 0; o < winners.length; o++) {
                
                if(winners[o] == peopleReacted[random]) {
                    inList = true;
                    y--;
                    beak;
                }
                
            }
            
            if(!inList) {
                winners.push(peopleReacted[random]);
            }
            
        }
        
        for (let y = 0; y < winners.length; y++) {
            
            message.channel.send("Congratulations " + winners[y].username + " You won!");
            
        }
        
    }, time * 1000)
    
}
 
module.exports.help = {
    name: "giveaway"
}