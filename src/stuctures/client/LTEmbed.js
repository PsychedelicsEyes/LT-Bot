const { EmbedBuilder } = require("discord.js");
const config = require('../config/embed')

module.exports = class LTEmbed extends EmbedBuilder {
    constructor(thumbnail) {
        super();
        this.setColor(config.color);
        this.setFooter({ text:config.footer });
        if(config.thumbnailActive === true) {
            this.setThumbnail(config.thumbnail);
        }
    }
}