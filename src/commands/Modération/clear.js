const {SlashCommandBuilder,CommandInteraction,PermissionFlagsBits} = require('discord.js');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Permet de supprimer un nombre specifique de message dans un channel sélectionner')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('montant')
        .setDescription('Montant de message a supprimé')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
    )
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Séléctioné un user a clear.')
        .setRequired(false)
    ),
    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('montant');
        const target = options.getUser("user");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`✅ ${messages.size} messages supprimé de ${target}.`);
                return interaction.reply({embeds: [embed]});
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`${messages.size} messages supprimé du channel.`);
                return interaction.reply({embeds: [res]});
            });
        }
    }
}