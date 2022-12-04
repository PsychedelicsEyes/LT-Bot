const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');
const ownerSchema = require("../../utils/models/owner.model");
const wlSchema = require("../../utils/models/whitelist.model");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addowner')
    .setDescription('Permet d\'ajouter un owner pour le bot')
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
    ownerOnly: true,
    async execute(interaction) {
        const {channel, options} = interaction;
        
        const user = options.getUser("user");
        const reason = options.getString('raison')

        wlSchema.findOne({ _id: user.id}, async (err, data) => {
            if(!data) {
                await wlSchema.create({
                    _id: user.id,
                    username: user.username,
                    reason: reason,
                    wlby: `Ajouter par ${interaction.user.id}(${interaction.user.username})`,
                })
            }
        })

        ownerSchema.findOne({ _id: user.id}, async (err, data) => {
            if(!data) {
                await ownerSchema.create({
                    _id: user.id,
                    username: user.username,
                    reason: reason,
                    addby: `Ajouter par ${interaction.user.id}(${interaction.user.username})`,
                })

                return interaction.reply({content: "Le membre a été ajouter en tant que owner ✅"})
            } else {
                return interaction.reply({content: "Le membre est déjà owner"})
            }
        })
        
    }
}