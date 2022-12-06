const { Client,GatewayIntentBits,Collection,Partials } = require('discord.js');
const { Guilds,GuildMembers,GuildMessages,MessageContent } = GatewayIntentBits;
const { User,Message,GuildMember,ThreadMember } = Partials;
const ownerModel = require('../../utils/models/owner.model');
const whiteListModel = require('../../utils/models/owner.model');

class LTClient extends Client {
    constructor(options = {
        intents: [Guilds,GuildMembers,GuildMessages,MessageContent],
        Partials: [User,Message,GuildMember,ThreadMember],
    })
    {
        super(options);
        const {loadEvents} = require('../../utils/handlers/eventHandlers');
        const {loadCommands} = require('../../utils/handlers/commandHandlers');
        this.config = require('../config/client');
        this.commands = new Collection();
        this.wlUsers = [];
        this.ownerUsers = [];
        this.blLinks = [];

        this.refreshOwnered();
        setInterval(async() => {
            await this.refreshOwnered();
        }, 1000);

        this.refreshWitheListed();
        setInterval(async() => {
            await this.refreshWitheListed();
        }, 1000);

        this.login(this.config.token).then(() => {
            loadEvents(this);
            loadCommands(this);
        })
    }

    refreshOwnered = async() => {
        const query = await ownerModel.find({}).exec();
        const ids = query.map(user => user._id);
        this.ownerUsers = ids;
        
    }

    refreshWitheListed = async() => {
        const query = await whiteListModel.find({}).exec();
        const ids = query.map(user => user._id);
        this.wlUsers = ids;
    }
}
module.exports = LTClient;