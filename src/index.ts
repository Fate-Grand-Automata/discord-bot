require("fix-esm").register();
import { Client, GatewayIntentBits, Collection } from "discord.js";
const { Guilds, MessageContent, GuildMessages } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages]})
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { join } from "path";
import { globSync } from "glob";
config()

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersPattern = join(__dirname, "./handlers/*.js").replace(/\\/g,'/')
globSync(handlersPattern).forEach(handler => {
    require(handler)(client)
})

client.login(process.env.TOKEN)