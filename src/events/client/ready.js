const { mongoose, mongo } = require('mongoose');
const LTClient = require('../../stuctures/client/LTClient');

module.exports = {
    name: 'ready',
    once: true,
    async execute(LTClient) {
        await mongoose.connect(LTClient.config.mongoURL || '', {
            keepAlive: true,
        });
        if (mongoose.connect) {
            console.log('La DB est connecté')
        }
        console.log('Le bot est connecté')
    }
}