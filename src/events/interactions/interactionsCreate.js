const {commandInteraction} = require('discord.js');

module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            interaction.reply({content: "commande dépasser"});
        }

        command.execute(interaction, client);
    },
};