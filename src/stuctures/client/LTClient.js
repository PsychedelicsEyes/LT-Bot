const { Client,GatewayIntentBits,Collection,Partials } = require('discord.js');
const { Guilds,GuildMembers,GuildMessages } = GatewayIntentBits;
const { User,Message,GuildMember,ThreadMember } = Partials;
const mongoose = require('mongoose');


class LTClient extends Client {
    constructor(options = {
        intents: [Guilds,GuildMembers,GuildMessages],
        Partials: [User,Message,GuildMember,ThreadMember]
    })
    {
        super(options);
        const {loadEvents} = require('../../utils/handlers/eventHandlers');
        const {loadCommands} = require('../../utils/handlers/commandHandlers');
        this.config = require('../config/client');
        this.commands = new Collection();

        this.login(this.config.token).then(() => {
            loadEvents(this);
            loadCommands(this);
        })
    }
}
module.exports = LTClient;