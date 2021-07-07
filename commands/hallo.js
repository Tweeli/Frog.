const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.channel.send("Hallo.")

}

module.exports.help = {
    name: "allo"
}