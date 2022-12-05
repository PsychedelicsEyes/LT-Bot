const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');
const ownerSchema = require("../../utils/models/owner.model");
const wlSchema = require("../../utils/models/whitelist.model");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removeowner')
    .setDescription('Permet de supprimer un owner pour le bot')
    .addUserOption(options =>
        options.setName('cible')
        .setDescription('Séléctioné un user a supprimer')
        .setRequired(true)
    ),
    ownerOnly: true,
    async execute(interaction, client) {
        const {channel, options} = interaction;
        
        const user = options.getUser("cible");

        if(user.id === client.config.owner) {
            interaction.reply({ content: 'Vous pouvez pas faire cette action sur le vrai owner du bot.'})
        } else {
            ownerSchema.findOne({ _id: user.id}, async (err, data) => {
                if(data) {
                    await ownerSchema.deleteOne()
    
                    return interaction.reply({content: "Le membre est désormais plus owner ✅"})
                } else {
                    return interaction.reply({content: "Le membre est pas owner"})
                }
            })
            wlSchema.findOne({ _id: user.id}, async (err, data) => {
                if(data) {
                    await wlSchema.deleteOne()
                }
            })
        }
    }
}