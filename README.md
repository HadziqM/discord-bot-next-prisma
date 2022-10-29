## Installation

Clone the repository then create a file named `.env` and fill it out accordingly

```js
##Discord Data
TOKEN=YOUR BOT TOKEN
CLIENT_ID=YOUR BOT CLIENT ID
PREFIX=YOUR BOT COMMAND PREFIX

# Sub Discord Data
RULE_URL=
CHAT_URL=
GUIDE_URL=
BOUNTY_URL=
BIND_URL=


REGISTERED_ROLE=
MEMBER_ROLE=
EXPERT_ROLE=
MASTER_ROLE=
CHAMPION_ROLE=
ROAD_ROLE=
DEMOLIZER_ROLE=

EROR_LOG_CHANNEL=
USER_CREATE_LOG_CHANNEL=
TRANSVER_SAVE_LOG_CHANNEL=
JOIN_CHANNEL=
LEAVE_CHANNEL=
RULE_CHANNEL=
SUBMIT_CHANNEL=
BOUNTY_LOG_CHANNEL=
RECEPTIONIST_CHANNEL=
COOLDOWN_CHANNEL=
LEADERBOARD_CHANNEL=
PROMOTION_CHANNEL=
CONQUER_CHANNEL=
GACHA_CHANNEL=


# Database Data
DATABASE_URL="postgresql://user:password@host:port/erupe?connection_limit=50&&pool_timeout=100"
DISCORD_CLIENT_SECRET=
PUBLIC_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Run Necessary Schema To Postgress </br>
Just Run `.sql` on discord/query folder with pgadmin or any other tools </br>

Install module and build

```sh
npm i
npm run build
npm run dbuild
```

The setup is done now </br>
to run bot,and website simply using </br>

```
npm start
```

open terminal again then

```
npm run dstart
```

## How To use

generally this bot have 25 slash command, 3 context menu and 6 normal command </br>

### Slash Command List

- mycard -> to display users mhfz status if already binded, its also have button to turn on boost, turn off boost, get save data, and unlocking transmog </br>
- bind -> to bind discord id with game charachter (this use username and password for safety purpose) </br>
- register -> to make new game account, its recomended to disable autocreate account on erupe to make account create controllable </br>
- guild -> to show detailed list of guild on server, since the command is heavy this use prerendered file to make it fast </br>
- guild_join -> to join selected guild if player isnt on guild already </br>
- transfer -> to evaluate player savedata and uploaded it to server if the format and content is correct </br>

```
accepted file format is
savedata.bin
partner.bin
decomyset.bin
hunternavi.bin
otomoairou.bin
platebox.bin
platedata.bin
platemyset.bin
rengokudata.bin
savemercenary.bin
skin_hist.bin
```

- change_password -> registered player could freely change their account password</br>
- mod_pass -> admin only command to change password given user id</br>
- status -> to see how much user,charachter and registered player on database</br>
- clear -> admin only command to clear message</br>
- ping -> admin only command to see bot's ping</br>

### Context Menu List

- Card -> to see targetted user game status

### Normal Command List

- delete -> to delete all's bot application command (slahs command and context menu on guild)
- error -> to simulate error
