import { Cron } from "croner";
import { Client } from "discord.js";

const millisInHour = 60 * 60 * 1000

export class KickUnverifiedMembersJob {    
    constructor(client: Client) {
        const job = new Cron('0 */5 * * * *', () => {
            // only check members who joined in the past 24 hours
            const minJoinedAtTimestamp = Date.now() - 24 * millisInHour
            // only check members who have are members for at least 24 minutes to give time for verification
            const maxJoinedAtTimestamp = Date.now() - 0.40 * millisInHour
            
            // get the FGA server
            const guild = client.guilds.resolve("1117873862500163684")

            guild!.members.fetch()
                .then(members => {
                    // get all members who joined since joinedCutoffTimestamp and don't have a Verified role
                    members.filter(member =>
                        member.joinedTimestamp! > minJoinedAtTimestamp &&
                        member.joinedTimestamp! <= maxJoinedAtTimestamp &&
                        member.roles.cache.find(role => role.name == "Verified") === undefined
                    ).forEach(member => {
                        member.kick("Suspected bot, did not pass verification")
                    })
                })
                .catch(console.error);
        });
    }
}