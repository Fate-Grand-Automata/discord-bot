const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('questions')
		.setDescription('Refer users to #questions')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('The user to inform')
            .setRequired(true)
        ),
	async execute(interaction) {
        const target = interaction.options.getUser('user')
        const channel = interaction.guild.channels.cache.find(channel => channel.name === "questions");
		await interaction.reply(
`
${target} we'll need more information from you. Please create a post in ${channel} after checking if someone else already asked the same question.

If you have problems, first make sure that the app is updated and attach screenshots. If you have Android 12 or below you should record a video: More options -> Advanced -> Debug mode + Record Screen
`
        );
	},
};
