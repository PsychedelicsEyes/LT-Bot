const {commandInteraction} = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        
        if (!command) {
            return interaction.reply({content: "commande dépasser"});
        }

        if(command.ownerOnly == true && !client.ownerUsers.includes(interaction.user.id)) {
            return  interaction.reply({content: "Vous ne pouvez pas utiliser cette command"});
        }

        if(command.wlOnly == true && !client.trustedUsers.includes(interaction.user.id)) {
            return  interaction.reply({content: "Vous ne pouvez pas utiliser cette command"});
        }
        
        command.execute(interaction, client);
    },
};