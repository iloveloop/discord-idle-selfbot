# advanced idler using Discord.js-Selfbot-v13
---

## features

- **Idle Status**: switches to an idle rpc if no activity is detected for 3 minutes.
- **Online Status**: updates the rpc to online when activity is detected.
---

## requirements

- Node.js (v16.9.0 or later)
- A Discord account
- [discord.js-selfbot-v13](https://www.npmjs.com/package/discord.js-selfbot-v13)

---

## Setup

### 1. clone or download
clone this repository or download the files.

### 2. install dependencies
run the following command in the project directory:
```bash
npm install discord.js-selfbot-v13
```

### 3. add your token
replace the `client.login` line with your actual Discord token.  
> **warning**: be cautious with your token. do not share it with anyone as it provides full access to your account.

```javascript
client.login('yourtoken54654654646234242');
```

### 4. run the Script
run the script using:
```bash
node index.js
```

---
### how it works

1. **Activity Monitoring**  
   - the bot listens for messages sent by the user.
   - if a message is detected, the status switches to "Online" and resets the timer.

3. **Idle Detection**  
   - a timer checks for inactivity every 10 seconds.
   - if no activity is detected for 3 minutes (customizable), the status switches to "Idle."

---

## customization


### idle timer
adjust the `3 * 60 * 1000` value in the script to change the idle timeout timer.

---

## Disclaimer

Using selfbots violates Discord's Terms of Service. This script is intended for educational purposes. Use it at your own risk.

---
