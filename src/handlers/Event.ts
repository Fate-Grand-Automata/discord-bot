import { Client } from "discord.js";
import { join } from "path";
import { globSync } from 'glob'
import { color } from "../functions";
import { BotEvent } from "../types";

module.exports = (client: Client) => {
    let eventsFilePattern = join(__dirname, "../events/*.js").replace(/\\/g,'/')

    globSync(eventsFilePattern).forEach(file => {
        let event: BotEvent = require(`${file}`).default
        event.once ?
            client.once(event.name, (...args) => event.execute(...args))
            :
            client.on(event.name, (...args) => event.execute(...args))
        console.log(color("text", `🌠 Successfully loaded event ${color("variable", event.name)}`))
    })
}