const {SlashCommandBuilder,CommandInteraction,PermissionFlagsBits, MembershipScreeningFieldType} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Permet de kick un membre')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Séléctioné un user a kick.')
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

        if(user.kickable == false || interaction.user.id == member || member.roles.highest.position >= interaction.member.roles.highest.position || interaction.guild.ownerId == member) {
            const embed = new EmbedBuilder()
            .setTitle('❌Je ne peut pas kick ce membre')
            return interaction.reply({embeds: [embed]})
        } else {
            member.kick({ reason: `Kick par **${interaction.user.tag}** pour **${reason}**`})
            const embed = new EmbedBuilder()
            .setTitle('✅Le membre a été kick')
            return interaction.reply({embeds: [embed]})
        }
    }
}