const { Client, RichPresence } = require('discord.js-selfbot-v13');
const client = new Client();

let lastActivity = Date.now(); // tracks their last activity time
let isCurrentlyIdle = false; // tracks if the user is idle

// fetch pfp url
async function fetchProfilePicture(user) {
    return user.displayAvatarURL({ format: 'png', size: 512 });
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.username}!`);

    const avatarUrl = await fetchProfilePicture(client.user);

    // idle rpc
    const idlePresence = new RichPresence(client)
        .setType('PLAYING')
        .setName('Idle 😴')
        .setAssetsLargeImage(avatarUrl)
        .setAssetsLargeText('User is idle')
        .setAssetsSmallImage('https://cdn.discordapp.com/emojis/1313011029684518912.png?size=600&quality=lossless')
        .setAssetsSmallText('Idle')
//      .addButton('Example', 'https://example.com'); < ignore this for now

    // online rpc
    const activePresence = new RichPresence(client)
        .setType('PLAYING')
        .setName('Online 🟢')
        .setAssetsLargeImage(avatarUrl)
        .setAssetsLargeText('User is online')
        .setAssetsSmallImage('https://cdn.discordapp.com/emojis/1313016721552048188.png?size=600&quality=lossless')
        .setAssetsSmallText('Online')
//      .addButton('Example', 'https://example.com'); < ignore this for now

    // idle on default
    client.user.setPresence({ activities: [idlePresence], status: 'idle' });
//  console.log('status set to idle.'); < uncomment if u want console logs

    // listen for messages
    client.on('messageCreate', (message) => {
        if (message.author.id === client.user.id) {
            // reset the status on user activity
            client.user.setPresence({ activities: [activePresence], status: 'online' });
            isCurrentlyIdle = false;
            lastActivity = Date.now();
//          console.log('activity detected. status set to online.'); < uncomment if u want logs
        }
    });

    // detection logic
    setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastActivity >= 3 * 60 * 1000) { // 3 minutes in milliseconds
            if (!isCurrentlyIdle) {
                // switch to idle
                client.user.setPresence({ activities: [idlePresence], status: 'idle' });
                isCurrentlyIdle = true;
                console.log('No activity detected. Status set to idle.');
            }
        } else if (isCurrentlyIdle) {
            // detect if user is unidle
            client.user.setPresence({ activities: [activePresence], status: 'online' });
            isCurrentlyIdle = false;
//          console.log('activity detected, user is back online'); < uncomment if u want console logs
        }
    }, 10 * 1000); // check every 10s
});

// error handling
client.on('error', (err) => console.error('Discord client error:', err));
process.on('uncaughtException', (err) => console.error('Unhandled exception:', err));
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled promise rejection:', reason, promise);
});

// replace with token
client.login('yourtoken54654654646234242');
