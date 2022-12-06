const { mongoose } = require('mongoose');
const EmbedBuilder = require('../../stuctures/client/LTEmbed')
const blSchema = require('../../utils/models/blWord.model');

module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (!message.guild || message.author.bot) return;
        
        blSchema.findOne({ word: message}, async (err, data) => {
            if(data && !client.wlUsers.includes(message.author.id)) {
                message.delete();
                const embed = new EmbedBuilder()
                .setTitle(`les liens d\'invitations sont interdits`)
                return message.channel.send({embeds:[embed]})
            } 
        })

    }
}