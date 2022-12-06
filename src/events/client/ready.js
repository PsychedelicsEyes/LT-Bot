const { mongoose } = require('mongoose');
const ownerSchema = require('../../utils/models/owner.model')
const wlSchema = require('../../utils/models/whitelist.model')

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

        const user =  await LTClient.users.fetch(LTClient.config.owner);

        ownerSchema.findOne({ _id: LTClient.config.owner}, async (err, data) => {
            if(!data) {
                await ownerSchema.create({
                    _id: LTClient.config.owner,
                    reason: "Add automated by the bot",
                    username: user.tag,
                    addby: LTClient.user.username,
                })
            }
        })

        wlSchema.findOne({ _id: LTClient.config.owner}, async (err, data) => {
            if(!data) {
                await wlSchema.create({
                    _id: LTClient.config.owner,
                    reason: "Add automated by the bot",
                    username: user.tag,
                    wlby: LTClient.user.username,
                })
            }
        })

        console.log('Le bot est connecté');
    }
}