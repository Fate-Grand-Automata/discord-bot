import { ChannelType, ThreadChannel } from "discord.js";
import { BotEvent } from "../types";
import { ForumChannel } from "discord.js";

const event : BotEvent = {
    name: "threadCreate",
    execute: async (thread: ThreadChannel) => {
        const channel = thread.parent
        if (channel && channel.type == ChannelType.GuildForum) {
            const forumChannel = channel as ForumChannel
            const problemTag = forumChannel.availableTags.filter(tag => tag.name == "Problem")[0]
            if (thread.appliedTags.includes(problemTag.id)) {
                const startingMessage = await thread.fetchStarterMessage()
                thread.send(`
${startingMessage?.author} we'll need some information before we can help you:

1. Which FGA Version are you using? (Can be found in the app's starting screen at the top)
2. Are you using the Playstore or Github app version?
3. What's your device model or emulator version?
4. What's your Android version?
5. Did you change any Fine-Tune settings? (Similarity, wait times, ...) If yes, what did you change?
6. If the problems happens in FGO, post a screenshot of the affected game area. (Support selection, battle, lottery, ...)
`)
            }
        }
    }
}

export default event;
