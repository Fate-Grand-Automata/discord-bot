import { ChannelType, ThreadChannel, userMention } from "discord.js";
import { BotEvent } from "../types";
import { ForumChannel } from "discord.js";
import { missingInfoMessage } from "../functions";

const event : BotEvent = {
    name: "threadCreate",
    execute: async (thread: ThreadChannel) => {
        const channel = thread.parent
        if (channel && channel.type == ChannelType.GuildForum) {
            const forumChannel = channel as ForumChannel
            const problemTag = forumChannel.availableTags.filter(tag => tag.name == "Problem")[0]
            if (thread.appliedTags.includes(problemTag.id)) {
                thread.send(missingInfoMessage(userMention(thread.ownerId!!)))
            }
        }
    }
}

export default event;
