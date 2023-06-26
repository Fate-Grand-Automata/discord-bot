import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const TroubleshootingCommand : SlashCommand = {
    cooldown: 300,
	command: new SlashCommandBuilder()
		.setName('troubleshooting')
		.setDescription('Troubleshooting Guide'),
	execute(interaction: CommandInteraction) {
		interaction.reply(
            "[Troubleshooting Guide](https://github.com/Fate-Grand-Automata/FGA/wiki/Troubleshooting)"
        );
	},
};

export default TroubleshootingCommand