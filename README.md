## Installation

Clone the repository then create a file named `.env` and fill it out accordingly

```js
TOKEN=YOURTOKENHERE
CLIENT_ID=BOTS CLIENT ID
PREFIX=!
DATABASE_URL=YOUR POSTGRESS URL
```

Run Necessary Module

```sh
npm i
npx prisma db pull
npm run dbuild
```

### Next Playground

Run dev server simply by

```
npm run dev
```

Build and deploy simply by

```
npm run build && npm run start
```

### Discord playground

Running discord by

```
npm run dstart
```

or if you make some change on the file

```
npm run restart
```

to build and run discord bot
