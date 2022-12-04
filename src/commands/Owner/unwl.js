const {SlashCommandBuilder} = require('discord.js');
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

        wlSchema.findOne({ _id: user.id}, async (err, data) => {
            if(data) {
                await wlSchema.deleteOne()

                return interaction.reply({content: "L'user est maintenant unwhitelist"})
            } else {
                return interaction.reply({content: "L'user est pas withelist"})
            }
        })
    }
}