const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    const categoryID = "850530980430479361";
    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("Je hebt al een ticket aangemaakt");

            return;
        }

    });

    if (ticketBestaat) return;


    var ticketEmbed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setColor("#6aa75e")
        .setFooter('Created by Tweeli.#0001');

    message.channel.send(ticketEmbed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hoi ${message.author.username}`)
                        .setDescription("Het support team komt er zo snel mogelijk aan! \n Zeg hier alvast je vraag.")
                        .setColor('#6aa75e')
                        .setFooter('Created by Tweeli.#0001');
       
                    settedParent.send(embedParent);

                    var ticketLog = new discord.MessageEmbed()
                    .setTitle("Ticket, " + message.channel.name)
                    .setDescription("Het ticket van " + message.channel.name + " is geopend.")
                    .setColor("#6aa75e")
                    .setFooter('Created by Tweeli.#0001');
                    var logChannel = message.guild.channels.cache.find(channel => channel.id === "850539977444294686")
                    if(!logChannel) return message.reply("Er is iets misgelopen.");
                    logChannel.send(ticketLog);
   
             

                    

                    

                }
            ).catch(err => {
                message.channel.send("Er is iets misgelopen");
            });
        }
    ).catch(err => {
        message.channel.send("Er is iets misgelopen");
    });
}

module.exports.help = {
    name: "new"
}