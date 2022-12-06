const { mongoose } = require('mongoose');
const { EmbedBuilder } = require('discord.js')
const blSchema = require('../../utils/models/blUser.model')

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    async execute(member, client) {
        blSchema.findOne({ _id: member.id}, async (err, data) => {
            if(data) {
                const blEmbed = new EmbedBuilder()
                .setTitle(`${client.user.username} systeme`)
                .setDescription(`Vous avez avez été bannis de **${member.guild.name}** raison de blacklist`)
                .addFields(
                    { name : 'Blacklist par', value: `${data.blBy}`},
                    { name: 'Raison du blacklist', value: `${data.reason}`},
                    { name: 'Date du blacklist', value: `${data.timestamp == null ? "Timestamp invalide" : data.timestamp.toLocaleString()}`}
                )
                await member.send({embeds: [blEmbed]})
                return member.guild.bans.create(member.id,{ reason:' ban pour bl'}).catch()
            }
        })

    }
}