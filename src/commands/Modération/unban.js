const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Permet de unban un user')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(options =>
        options.setName('user')
        .setDescription('Fournisser une id a unban')
        .setRequired(true)
    )
    .addStringOption(options =>
        options.setName('raison')
        .setDescription('Fournisser une raison')
    ),
    async execute(interaction, client) {
        const {channel, options} = interaction;

        const id = options.getString('user');
        const reason = options.getString('raison') || "Aucune raison fournie";

        if (!rgx.test(id)) {
            const embed = new EmbedBuilder()
            .setTitle('❌Ceci n\'est pas une id valide')
           return interaction.reply({embeds: [embed]})
        } else {
            const bannedUsers = await interaction.guild.bans.fetch();
            const user = bannedUsers.get(id).user;
    
            if (!user) {
                const embed = new EmbedBuilder()
                .setTitle('❌Je ne trouve pas l\`user. Vérifier l\'id')
                return interaction.reply({embeds: [embed]})
            } else {
                await interaction.guild.members.unban(user, `Unban par ${interaction.user.tag}, raison: ${reason}`)
                const embed = new EmbedBuilder()
                .setTitle('✅L\'user est bien été débanis')
               return interaction.reply({ embeds: [embed]})
            }
        }
    }
}