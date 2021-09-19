const Scraper = require('images-scraper');
const google = new Scraper({ puppeteer: { headless: true } });

module.exports = {
    name: 'image',
    aliases: ['img'],
    permissions: [],
    cooldown: 0,
    description: 'search google for an image',
    async execute(message, args, client, Discord) {
        const image_query = args.join('-');

        if (!image_query) 
            return message.channel.send({ content: 'Enter the image to search for.' });

        const image_results = await google.scrape(image_query, 25);
        var num = Math.floor(Math.random()*image_results.length);

        //console.log('User ' + message.author.username + ' searched for ' + image_query);
        //console.log('\tURL: ' + image_results[num].url);
     
        let embed = new Discord.MessageEmbed()
        .setTitle('IMAGE SEARCH')
        .addFields(
            { name: 'Search Query:', value: args.join(' '), inline: true },
            { name: 'Searched By:', value : message.author.username, inline: true })
        .setColor("RANDOM")
        .setTimestamp()
        .setImage(image_results[num].url);

        await message.channel.send({ embeds: [embed]});

    }
}