import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const QuestionsCommand : SlashCommand = {
    cooldown: 300,
	command: new SlashCommandBuilder()
		.setName('questions-and-problems')
		.setDescription('Refer users to #questions-and-problems')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('The user to inform')
            .setRequired(true)
        ),
	execute: interaction => {
        const target = interaction.options.getUser('user')
        const questionsChannel = interaction.guild?.channels.cache.find(channel => channel.name === "questions-and-problems")
        const commonProblemsChannel = interaction.guild?.channels.cache.find(channel => channel.name === "common-problems")
		interaction.reply(
`
${target} please check ${commonProblemsChannel} and recently asked questions and reported problems in ${questionsChannel}.

If you don't find your problem under them, create a post in ${questionsChannel}.
`
        );
	},
};

export default QuestionsCommand