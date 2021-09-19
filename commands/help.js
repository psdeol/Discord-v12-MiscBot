module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    cooldown: 0,
    description: 'displays available commands',
    async execute(message, Discord) {
     
        let embed = new Discord.MessageEmbed()
        .setTitle('UTILITY BOT COMMANDS')
        .addFields(
            { 
                name: '!image <Search>',
                value: 'searches google for an image' 
            },
            { 
                name: '!delete <Number>',
                value: 'bulk deletes messages, up to 98 at a time' 
            },
            { 
                name: '!emojify <Sentence>', 
                value: 'sends sentence using emojis' 
            },
            { 
                name: '!poll | <Question> | <Option1> | <Option2> | ... | ',
                value: 'creates a poll' 
            }
        )
        .setColor('ORANGE');

        await message.channel.send({ embeds: [embed]});

    }
}