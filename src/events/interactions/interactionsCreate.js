const {commandInteraction} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        
        if (!command) {
            return interaction.reply({content: "commande dépasser"});
        }

        if(command.ownerOnly == true && !client.ownerUsers.includes(interaction.user.id)) {
            const embed = new EmbedBuilder()
            .setTitle('Vous ne pouvez pas utiliser cette command')
            return  interaction.reply({embeds: [embed]});
        }

        if(command.wlOnly == true && !client.wlUsers.includes(interaction.user.id)) {
            const embed = new EmbedBuilder()
            .setTitle('Vous ne pouvez pas utiliser cette command')
            return  interaction.reply({embeds: [embed]});
        }
        
        command.execute(interaction, client);
    },
};