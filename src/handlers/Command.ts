import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { join } from "path";
import { globSync } from "glob";
import { color } from "../functions";
import { Command, SlashCommand } from "../types";

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []
    const commands : Command[] = []

    let slashCommandsPattern = join(__dirname,"../slashCommands/*.js").replace(/\\/g,'/')
    let commandsPattern = join(__dirname,"../commands/*.js").replace(/\\/g,'/')

    globSync(slashCommandsPattern).forEach(file => {
        let command : SlashCommand = require(file).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })

    globSync(commandsPattern).forEach(file => {
        let command : Command = require(file).default
        commands.push(command)
        client.commands.set(command.name, command)
    })

    const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log(color("text", `🔥 Successfully loaded ${color("variable", data.length)} slash command(s)`))
        console.log(color("text", `🔥 Successfully loaded ${color("variable", commands.length)} command(s)`))
    }).catch(e => {
        console.log(e)
    })
}