const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName()
    .setDescription()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
      
    }
}