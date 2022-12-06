const {SlashCommandBuilder} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed');
const wlSchema = require("../../utils/models/whitelist.model");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unwl')
    .setDescription('Permet de unwhitelist un user')
    .addUserOption(options =>
        options.setName('user')
        .setDescription('Séléctioné un user a supprimé')
        .setRequired(true)
    ),
    wlOnly: true,
    async execute(interaction, client) {
        const {channel, options} = interaction;
        
        const user = options.getUser("user");

        if(user.id === client.config.owner) {
            const embed = new EmbedBuilder()
            .setTitle('❌Vous pouvez pas unwhitelist l\'owner du bot')
            return interaction.reply({embeds:[embed]})
        } 
        
        wlSchema.findOne({ _id: user.id}, async (err, data) => {
            if(data) {
                await wlSchema.deleteOne()
                const embed = new EmbedBuilder()
                .setTitle('✅L\'user est maintenant unwhitelist')
                return interaction.reply({embeds:[embed]})
            } else {
                const embed = new EmbedBuilder()
                .setTitle('❌L\'user est pas withelist')
                return interaction.reply({embeds:[embed]})
            }
        })
    }
}