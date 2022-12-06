const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie pong')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        try {
            const mesg = await interaction.reply({ content: "Pong!", fetchReply: true });
      
            await interaction.editReply({ content: `Pong!\nLatence du bot: \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`, Websocket latence: \`${client.ws.ping}ms\`` });
        } catch (err) {
            console.log("Something Went Wrong => ", err);
        }
    }
}