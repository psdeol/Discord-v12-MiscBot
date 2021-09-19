require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const client = new Discord.Client({ 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
client.commands = new Discord.Collection();

const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of cmdFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Utility Bot is online");
    client.user.setActivity("You", {
        type: "WATCHING",
    });
});

client.once("reconnecting", () => {
    console.log("Utility Bot is reconnecting");
});

client.once("disconnect", () => {
    console.log("Utility Bot is disconnecting");
});


client.on('messageCreate', async message => {
        
    if (!message.content.startsWith(prefix) || message.author.bot) 
        return;

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let cmd = args.shift();

    switch (cmd) {
        case 'h':
        case 'help':
            client.commands.get('help').execute(message, Discord);
            break;

        case 'del':
        case 'delete':
            client.commands.get('delete').execute(message, args, client, Discord);
            break;

        case 'emj':
        case 'emojify':
            client.commands.get('emojify').execute(message, args, client, Discord);
            break;

        case 'img':
        case 'image':
            client.commands.get('image').execute(message, args, client, Discord);
            break;

        case 'poll':
            /*
            args = message.content.replaceAll(/ +/, " ").slice(prefix.length).trim().split(" ");
            console.log(args);
            */
        
            args = message.content.slice(prefix.length).trim().split('|');
            args.shift();
            client.commands.get('poll').execute(message, args, client, Discord);
            break;

        default:
            message.channel.send({ content : 'Command Not Found' });
            break;

    }

    //message.delete({ timeout: 60000 }); // 60 second timer
});

client.login(token);