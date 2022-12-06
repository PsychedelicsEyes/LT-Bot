const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Permet de recrée un channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        interaction.channel.clone().then((ch) => {
            ch.setPosition(interaction.channel.position)
            interaction.channel.delete();

            const embed = new EmbedBuilder()
            .setTitle('Channel nuke avec succès ✅')
            .addFields(
                {name: 'Auteur du nuke', value: interaction.user.tag}
            )
            return ch.send({embeds: [embed]})
        })
    }
}