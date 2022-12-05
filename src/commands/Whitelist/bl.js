const {SlashCommandBuilder} = require('discord.js');
const blSchema = require('../../utils/models/blacklist.model')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bl')
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
            return interaction.reply({content: "Vous pouvez pas bl l'owner du bot"})
        }

        if (user.id === interaction.guild.ownerId) {
            blSchema.findOne({ _id: user.id}, async (err, data) => {
                if(!data) {
                    await blSchema.create({
                        _id: user.id,
                        username: user.username,
                        reason: reason,
                        blBy: `${interaction.user.id}(${interaction.user.username})`,
                    })

                    await interaction.reply({content: "L'user est maintenant blacklist ✅"})
                    return interaction.followUp({content: "Mais je n'ai pas pu le ban car c'est l'owner du serveur."})
                } else {
                    return interaction.reply({content: "L'user est déjà bl"})
                }
            })
        } else {
            blSchema.findOne({ _id: user.id}, async (err, data) => {
                if(!data) {
                    await blSchema.create({
                        _id: user.id,
                        username: user.username,
                        reason: reason,
                        blBy: `blacklist par ${interaction.user.id}(${interaction.user.username})`,
                    })
                    await member.ban({ reason: `${user.username} a été ban par ${client.user.username} pour raison de blacklist` });
                    return interaction.reply({content: "L'user est maintenant blacklist ✅"})
                  
                } else {
                    return interaction.reply({content: "L'user est déjà bl"})
                }
            })
        }
    }
}