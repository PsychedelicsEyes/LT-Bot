const {SlashCommandBuilder,CommandInteraction,PermissionFlagsBits, MembershipScreeningFieldType} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Permet de ban un membre')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Séléctioné un user a ban.')
        .setRequired(true)
    ) 
    .addStringOption(option =>
        option.setName('raison')
        .setDescription('raison du kick.')
    ),
    async execute(interaction) {
        const {channel, options} = interaction;

        const user = options.getUser('user');
        const reason = options.getString("raison") || "Aucune raison fournie";
        const member = await interaction.guild.members.fetch(user.id);

        if(user.bannable == false || interaction.user.id == member || member.roles.highest.position >= interaction.member.roles.highest.position || interaction.guild.ownerId == member) {
            const embed = new EmbedBuilder()
            .setTitle('❌Je ne peut pas ban ce membre')
            return interaction.reply({embeds: [embed]})
        } else if (interaction.user.id == interaction.guild.ownerId) {
            member.ban({ reason: `ban par **${interaction.user.tag}** pour **${reason}**`})
            const embed = new EmbedBuilder()
            .setTitle('✅Le membre a été ban')
            return interaction.reply({embeds: [embed]})
        } else {
            member.ban({ reason: `ban par **${interaction.user.tag}** pour **${reason}**`})
            const embed = new EmbedBuilder()
            .setTitle('✅Le membre a été ban')
            return interaction.reply({embeds: [embed]})
        }
    }
}