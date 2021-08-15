const discord = require('discord.js');
const fetch = require("node-fetch")
const botConfig = require('./botconfig.json');
const levelFile = require('./data/levels.json')
const fs = require('fs');

//client//
const bot = new discord.Client({
	partails: ['MESSAGE', 'CHANNEL', 'REACTION']
});

//Command handler
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();

//Command Handler.
fs.readdir('./commands/', (err, files) => {
	if (err) console.log(err);

	var jsFiles = files.filter(f => f.split('.').pop() === 'js');

	if (jsFiles.length <= 0) {
		console.log('Kon geen files vinden.');
		return;
	}

	jsFiles.forEach((f, i) => {

		var fileGet = require(`./commands/${f}`);
		console.log(`De file ${f} is geladen.`);

		bot.commands.set(fileGet.help.name, fileGet);

		fileGet.help.aliases.forEach(alias => {
			bot.aliases.set(alias, fileGet.help.name);
		})
	});
});


//Bot Status.
bot.on('ready', async () => {
	console.log(`${bot.user.username} Is online!`);

	bot.user.setActivity('Tweeli.#0001.', { type: 'LISTENING' });
});


//Verwijderd bericht log.
bot.on("messageDelete", messageDeleted => {

	if (messageDeleted.author.bot) return;

	var content = messageDeleted.content;
	if (!content) content = "Geen tekst meegegeven.";

	var respone = `Bericht ${messageDeleted.id} is verwijderd uit ${messageDeleted.channel} \n **Bericht:** ${content}`;

	var deletedContentEmbed = new discord.MessageEmbed()
		.setAuthor(`${messageDeleted.author.tag} (${messageDeleted.author.id})`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
		.setDescription(respone)
		.setTimestamp()
		.setColor('#6aa75e')
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png');

	bot.channels.cache.get('871799202055868477').send(deletedContentEmbed);


});


//Geëdit bericht log.
bot.on("messageUpdate", async (oldMessage, newMessage) => {

	if (newMessage.author.bot) return;

	if (oldMessage.content == newMessage.content) return;

	var newMessageEmbed = new discord.MessageEmbed()
		.setAuthor(`${newMessage.author.tag} (${newMessage.author.id})`, newMessage.author.avatarURL({ size: 4096 }))
		.setDescription(`Bericht ${newMessage.id} is bewerkt in ${newMessage.channel}\n **Voor:** ${oldMessage.content}\n **Na:** ${newMessage.content}`)
		.setColor('#6aa75e')
		.setTimestamp()
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png');
	bot.channels.cache.get('871799202055868477').send(newMessageEmbed);

})


//Scheldwoorden/bot.
bot.on('message', async message => {

	if (message.author.bot) return;

	if (message.channel.type === "dm") return message.lineReply("Bot commands kunnen niet in dm uitgevoerd worden.");

	var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"))

    if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) {
        if (message.member.roles.cache.has('682635913431482471')) return;
        if (message.member.roles.cache.has('560834546115805185')) return;
        message.delete()
          .then(message.channel.send(`${message.author} Uw links zijn verwijderd uit dit kanaal`))
      }

	var msg = message.content.toLocaleLowerCase();

	for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

		if (msg.includes(swearWords["vloekwoorden"][i])) {
			if (message.member.hasPermission("MANAGE_MESSAGES")) return

			message.delete();

			return message.reply("Gelieve niet te schelden.").then(msg => msg.delete({ timeout: 3000 }))
		}

	}

	var prefix = botConfig.prefix;

	var messageArray = message.content.split(' ');

	var command = messageArray[0];

	if (!message.content.startsWith(prefix)) return;

	var arguments = messageArray.slice(1);

	var commands = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));

	if (commands) commands.run(bot, message, arguments);
});

bot.login(process.env.token);