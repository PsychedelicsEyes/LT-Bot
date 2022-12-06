const {SlashCommandBuilder, Embed} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed');
const blSchema = require('../../utils/models/blUser.model');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bluser')
    .setDescription('Permet de blacklist un user')
    .addUserOption(options =>
        options.setName('user')
        .setDescription('Séléctioné un user a ajouté')
        .setRequired(true)
    )
    .addStringOption(options =>
        options.setName('raison')
        .setDescription('la raison de l\'ajout')
        .setRequired(true)
    ),
    wlOnly: true,
    async execute(interaction, client) {
        const {channel, options} = interaction;
        
        const user = options.getUser("user");
        const reason = options.getString('raison')
        const member = await interaction.guild.members.fetch(user.id)

        if (user.id === client.config.owner) {
            const embed = new EmbedBuilder()
            .setTitle('❌Vous pouvez pas bl l\'owner du bot')
            return interaction.reply({embeds: [embed]})
        }

        if (user.id === interaction.guild.ownerId) {
            blSchema.findOne({ _id: user.id}, async (err, data) => {
                if(!data) {
                    await blSchema.create({
                        _id: user.id,
                        username: user.tag,
                        reason: reason,
                        blBy: `${interaction.user.id}(${interaction.user.tag})`,
                    })
                    const embed = new EmbedBuilder()
                    .setTitle('✅L\'user est maintenant blacklist\nMais je n\'ai pas pu le ban car c\'est l\'owner du serveur.')
                    interaction.reply({embeds: [embed]})
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle('❌L\'user est déjà bl')
                    return interaction.reply({embeds: [embed]})
                }
            })
        } else {
            blSchema.findOne({ _id: user.id}, async (err, data) => {
                if(!data) {
                    await blSchema.create({
                        _id: user.id,
                        username: user.tag,
                        reason: reason,
                        blBy: `${interaction.user.id}(${interaction.user.tag})`,
                    })
                    await member.ban({ reason: `${user.tag} a été ban par ${client.user.tag} pour raison de blacklist` });

                    const embed = new EmbedBuilder()
                    .setTitle('✅L\'user est maintenant blacklist')
                    return interaction.reply({embeds: [embed]})
                  
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle('❌L\'user est déjà blacklist')
                    return interaction.reply({embes: [embed]})
                }
            })
        }
    }
}