import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const QuestionsCommand : SlashCommand = {
    cooldown: 300,
	command: new SlashCommandBuilder()
		.setName('questions')
		.setDescription('Refer users to #questions')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('The user to inform')
            .setRequired(true)
        ),
	execute: interaction => {
        const target = interaction.options.getUser('user')
        const questionsChannel = interaction.guild?.channels.cache.find(channel => channel.name === "questions")
        const commonProblemsChannel = interaction.guild?.channels.cache.find(channel => channel.name === "common-problems")
		interaction.reply(
`
${target} please check ${commonProblemsChannel} and recently asked questions in ${questionsChannel}.

If you don't find your problem under them, create a post in ${questionsChannel} with a detailed explanation and screenshots. Alternatively, if you have Android 12 or below you should record a video: More options -> Advanced -> Debug mode + Record Screen
`
        );
	},
};

export default QuestionsCommand