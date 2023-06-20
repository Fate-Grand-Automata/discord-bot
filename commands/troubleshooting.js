const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('troubleshooting')
		.setDescription('Troubleshooting Guide'),
	async execute(interaction) {
		await interaction.reply(
            "[Troubleshooting Guide](https://github.com/Fate-Grand-Automata/FGA/wiki/Troubleshooting)"
        );
	},
};
