const {SlashCommandBuilder} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed');
const blSchema = require('../../utils/models/blWord.model')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('blword')
    .setDescription('Permet de blacklist un user')
    .addStringOption(options =>
        options.setName('mot')
        .setDescription('le mot a blacklist')
        .setRequired(true)
    ),
    wlOnly: true,
    async execute(interaction, client) {
        const {channel, options} = interaction;
        
        const word = options.getString('mot')

        blSchema.findOne({ word: word}, async (err, data) => {
            if(!data) {
                await blSchema.create({
                    word: word,
                    blBy: `${interaction.user.id}(${interaction.user.username})`,
                })
                const embed = new EmbedBuilder()
                .setTitle('✅Le mot est maintenant blacklist')
                return interaction.reply({embeds: [embed]})
              
            } else {
                const embed = new EmbedBuilder()
                .setTitle('❌Le mot est déjà blacklist')
                return interaction.reply({embeds: [embed]})
            }
        })

    }
}