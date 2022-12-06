const {ComponentType,SlashCommandBuilder,ActionRowBuilder,StringSelectMenuBuilder,} = require("discord.js");

const EmbedBuilder = require('../../stuctures/client/LTEmbed');
  
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Voir la liste des commands disponible."),
  async execute(interaction) {
    const emojis = {
      information: "📚",
      modération: "🛠",
      owner: "👑",  
      whitelist: "✅",
    };
  
    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];
  
    const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
  
    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
        .filter((cmd) => cmd.folder === dir)
          .map((cmd) => {
            return {
              name: cmd.data.name,
              description:
                cmd.data.description ||
                "La command n'as pas de description",
            };
          });
  
      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });
  
    const embed = new EmbedBuilder().setDescription("S'il vous plaît choisissez une catégorie");
  
    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("S'il vous plaît sélectionnée une catégorie")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `List des commandes dans ${cmd.directory}.`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];
  
    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });
  
    const filter = (interaction) => interaction.user.id === interaction.member.id;
  
    const collector = interaction.channel.createMessageComponentCollector({filter,componentType: ComponentType.SelectMenu,});
  
    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );
  
      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${formatString(directory)} commands`)
        .setDescription(
          `List des commands de la catégorie ${directory}`
        )
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            };
          })
        );
  
      interaction.update({ embeds: [categoryEmbed] });
      });
  
      collector.on("end", () => {
        initialMessage.edit({ components: components(true) });
      });
    },
  };