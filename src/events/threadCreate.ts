import { ChannelType, ThreadChannel, userMention } from "discord.js";
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
                thread.send(`
${userMention(thread.ownerId!!)} we'll need some information before we can help you:

1. Which FGA Version are you using? (Can be found in the app's starting screen at the top)
2. Are you using the Playstore or Github app version?
3. What's your device model or emulator version?
4. What's your Android version?
5. Did you change any Fine-Tune settings? (Similarity, wait times, ...) If yes, what did you change?
6. If the problems happens in FGO, record a video:
 - On Android 12, go to More Options -> Advanced and enable Debug mode and Record Screen.
    
    Your FGA directory will contain a record.mp4 file after you've pressed the Stop button. You probably have to upload it to Youtube or streamable.com to share it here.
 - On Android 13 or above, follow this guide: https://youtu.be/iIjZPjDcZeM
    
    If you don't have a PC, then at least post screenshots of the problematic areas.
`)
            }
        }
    }
}

export default event;
