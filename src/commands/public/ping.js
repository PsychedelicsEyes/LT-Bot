const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie pong')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute(interaction) {
        interaction.reply({content: "Pong", ephermal: true})
    }
}