const discord = require('discord.js')
 
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to use this command') //When the author doesnt have the manage messages permission it wouldn't let them use the command
        if(!args[0]) return message.channel.send('Please specify an amount to delete (1-99)') // when there is no number provided
        if(isNaN(args[0])) return message.channel.send('Numbers are only allowed') // checking if the args is a number.
        if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99') //Max amount of messages avaible to delete is 99
 
        await message.channel.bulkDelete(parseInt(args[0]) + 1) // deleting messages
            .catch(err => console.log(err)) // if there are errors it will show them in the console / terminal
        message.channel.send(`Deleted ${args[0]} messages!`).then(m => m.delete({ timeout : 5000 })) //sending te sucess message then deleting after 5 seconds.
    }
    module.exports.help = {
        name: "clear"
    }
    