const {SlashCommandBuilder} = require('discord.js');
const blSchema = require('../../utils/models/blWord.model')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unblword')
    .setDescription('Permet de unblacklist un mot')
    .addStringOption(options =>
        options.setName('mot')
        .setDescription('le mot a blacklist')
        .setRequired(true)
    ),
    wlOnly: true,
    async execute(interaction, client) {
        const {channel, options} = interaction;
        
        const word = options.getString('word')

        blSchema.findOne({ word: word}, async (err, data) => {
            if(data) {
                await blSchema.deleteOne()
                return interaction.reply({content: "✅Le mot est maintenant unblacklist"})
              
            } else {
                return interaction.reply({content: "❌Le mot est pas blacklist"})
            }
        })

    }
}