import { Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";

const event : BotEvent = {
    name: "clientReady",
    once: true,
    execute: (client : Client) => {
        console.log(
            color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
        )
    }
}

export default event;