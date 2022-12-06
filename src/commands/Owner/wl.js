const {SlashCommandBuilder} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed');
const wlSchema = require("../../utils/models/whitelist.model");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wl')
    .setDescription('Permet de whitelist un user')
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

        wlSchema.findOne({ _id: user.id}, async (err, data) => {
            if(!data) {
                await wlSchema.create({
                    _id: user.id,
                    username: user.username,
                    reason: reason,
                    wlby: `Ajouter par ${interaction.user.id}(${interaction.user.username})`,
                })

                const embed = new EmbedBuilder()
                .setTitle('✅L\'user est maintenant whitelist')
                return interaction.reply({embeds:[embed]})
            } else {
                const embed = new EmbedBuilder()
                .setTitle('❌L\'user est déjà whitelist')
                return interaction.reply({embeds:[embed]})
            }
        })
    }
}