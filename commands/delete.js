module.exports = {
    name: 'delete',
    aliases: ['del'],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    cooldown: 0,
    description: 'delete up to 99 messages',
    async execute(message, args, client, Discord) {
        if (args[0] === null)
            return message.channel.send({ content: "Enter the number of messages to delete." });

        let amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) 
            return message.channel.send({ content: "Enter a number." });
        else if (amount < 1 || amount > 100) 
            return message.channel.send({ content: "Enter a number between 1 and 98" });
      
        await message.channel.messages.fetch({ limit: amount }).then(messages => {
                message.channel.bulkDelete(messages);
        });
    }
}