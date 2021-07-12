const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const activeSongs = new Map();


//client//
const bot = new discord.Client();
bot.commands = new discord.Collection();


fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen.`);

        bot.commands.set(fileGet.help.name, fileGet);


    })

})
bot.login(botConfig.token);

bot.on("ready", async () => {

    console.log(`${bot.user.username} Is online!`)

    bot.user.setActivity("Tweeli.#0001.", { type: "LISTENING" });

});

bot.on("message", async message => {

    if (message.author.bot) return;

    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var msg = message.content.toLocaleLowerCase();

    for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

        if (msg.includes(swearWords["vloekwoorden"][i])) {
            message.delete();

            return message.reply("Gelieve niet te schelden.").then(msg => msg.delete({ timeout: 3000 }));
        }

    }

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    RandomXp(message);


    if (!message.content.startsWith(prefix)) return;


    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    var options = {
        active: activeSongs
    };

    if (commands) commands.run(bot, message, arguments, options);


});

bot.login(process.env.token);
