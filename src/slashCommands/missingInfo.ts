import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { missingInfoMessage } from "../functions";

const QuestionsCommand : SlashCommand = {
    cooldown: 300,
	command: new SlashCommandBuilder()
		.setName('missing-info')
		.setDescription('Asks the user for more info about their problem')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('The user to inform')
            .setRequired(true)
        ),
	execute: interaction => {
        const target = interaction.options.getUser('user')
		interaction.reply(missingInfoMessage(target));
	}
};

export default QuestionsCommand