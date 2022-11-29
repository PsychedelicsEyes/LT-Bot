const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');
const userModel = require("../../utils/models/owner.model");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('addowner')
    .setDescription('Permet d\'ajouter un owner pour le bot')
    .addUserOption(options =>
        options.setName('cible')
        .setDescription('Séléctioné un user a ajouté')
        .setRequired(true)
    ),
    ownerOnly: true,
    async execute(interaction) {
        const {channel, options} = interaction;
        
        const user = options.getUser("cible");
        const userID = await interaction.guild.members.fetch(user.id);

        const query = await userModel.findById(userID).lean().exec();
        if(query) return interaction.reply({content: "Le membre est déjà whitelist"}).catch();

        const payload = {
            _id: userID,
            addby: interaction.user.id,
        }

        const result = await userModel.create(payload);
        return interaction.reply({content: "Le membre est whitelist maintenant ✔"}).catch();
    }
}