const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Permet de recrée un channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        interaction.channel.clone().then((ch) => {
            ch.setParent(interaction.channel.parent.id);
            ch.setPosition(interaction.channel.position)
            interaction.channel.delete();

            const embed = new EmbedBuidler()
            .setTitle('Channel nuke avec succès ✅')
            .addFields(
                {name: 'Auteur du nuke', value: interaction.user.username}
            )
            ch.send({embeds: [embed]})
        })
    }
}