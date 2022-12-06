const {SlashCommandBuilder} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('guild')
    .setDescription('Permet d\'avoir la liste de tout les serveur avec une invitation'),
    ownerOnly: true,
    async execute(interaction, client) {
        
        const channels = client.guilds.cache.map((guild) => guild.channels.cache.filter(channel => channel.isTextBased()).first());
        const invites = channels.map((channel) => channel.createInvite({maxUses: 0, maxAge: 0, temporary: false}).then(invite => `${channel.guild.name} (${channel.guild.id}) - ${invite.url ?? "pas la perm"}`).catch(() => `${channel.guild.name} (${channel.guild.id}) - pas la perm`));
       
        Promise.all(invites).then(guild => {
            const embed = new EmbedBuilder()
            .setTitle("Tous les serveurs du bot")
            .setDescription(guild.join("\n"))
            interaction.reply({embeds: [embed]})
        })

    }
}