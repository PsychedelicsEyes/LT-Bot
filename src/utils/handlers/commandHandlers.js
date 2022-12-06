function loadCommands(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Commands", "Status");
  
    let commandsArray = [];
  
    const commandsFolder = fs.readdirSync("./src/commands");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
  
      for (const file of commandFiles) {
        const commandFile = require(`../../commands/${folder}/${file}`);
  
        const properties = { folder, ...commandFile };
        client.commands.set(commandFile.data.name, properties);
  
        commandsArray.push(commandFile.data.toJSON());
  
        table.addRow(file, "loaded");
        continue;
      }
    }
  
    client.application.commands.set(commandsArray);
  
    return console.log(table.toString(), "\nCommands Chargé");
  }
  
  module.exports = { loadCommands };