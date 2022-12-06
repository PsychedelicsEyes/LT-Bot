const {SlashCommandBuilder} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed');
const blSchema = require('../../utils/models/blUser.model');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unbluser')
    .setDescription('Permet de unblacklist un user')
    .addStringOption(options =>
        options.setName('user')
        .setDescription('Séléctioné un user a supprimé')
        .setRequired(true)
    ),
    wlOnly: true,
    async execute(interaction, client) {
        const {channel, options} = interaction;
        
        const user = options.getString("user");

        blSchema.findOne({ _id: user.id}, async (err, data) => {
            if(data) {
                await blSchema.deleteOne()
                const embed = new EmbedBuilder()
                .setTitle('✅L\'user est maintenant unblacklist')
                return interaction.reply({embeds: [embed]})
                    
            } else {
                const embed = new EmbedBuilder()
                .setTitle('❌L\'user est pas blacklist ou je ne trouve pas l\'id')
                return interaction.reply({embeds: [embed]})
            }
        })
           

        
    }
}