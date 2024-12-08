import chalk from "chalk"
import delay from "delay"
import { GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel } from "discord.js"

type colorType = "text" | "variable" | "error"

const themeColors = {
    text: "#ff8e4d",
    variable: "#ff624d",
    error: "#f5426c"
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (color: colorType, message: any) => {
    return chalk.hex(themeColors[color])(message)
}

export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
    let neededPermissions: PermissionResolvable[] = []
    permissions.forEach(permission => {
        if (!member.permissions.has(permission)) neededPermissions.push(permission)
    })
    if (neededPermissions.length === 0) return null
    return neededPermissions.map(p => {
        if (typeof p === "string") return p.split(/(?=[A-Z])/).join(" ")
        else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })
}

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
    channel.send(message)
        .then(async m => {
            await delay(duration)
                .then(() => channel.messages.fetch(m))
                .then(messageToDelete => messageToDelete.delete())
        })
    return
}

export const missingInfoMessage = (user: any) => `
${user} we'll need some information before we can help you:

1. Which FGA Version are you using? (Can be found in the app's starting screen at the top)
2. Are you using the Playstore or Github app version?
3. What's your device model or emulator version?
4. What's your Android version?
5. Did you change any Fine-Tune settings? (Similarity, wait times, ...) If yes, what did you change?
6. If the problems happens in FGO, record a video:
  - On Android 12 or below, go to More Options -> Advanced and enable Debug mode and Record Screen.
    
    Your FGA directory will contain a record.mp4 file after you've pressed the Stop button. You probably have to upload it to Youtube or streamable.com to share it here.
  - On Android 13 or above, follow this guide: https://youtu.be/iIjZPjDcZeM
    
    If you don't have a PC, then at least post screenshots of the problematic areas.
`