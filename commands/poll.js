const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫'];
//📊

module.exports = {
    name: 'poll',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'creates a poll',
    async execute(message, args, client, Discord) {
        
        let options_string = "";
        let num_options = 0;

        for (let i = 1; i < args.length; i++) {
            args[i] = args[i].trim();

            if (args[i] !== "" && args[i] !== " ") {
                options_string += `${emojis[i-1]} ${args[i]}\n`;
                num_options++;
            }
        }

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username} asks`, message.author.displayAvatarURL())
        .setTitle(args[0])
        .setDescription(options_string)
        .setColor("YELLOW")
        .setTimestamp();

        let embed_message = await message.channel.send({ embeds: [embed]});

        for (let i = 0; i < num_options; i++) {
            embed_message.react(emojis[i]);
        }
    }
}