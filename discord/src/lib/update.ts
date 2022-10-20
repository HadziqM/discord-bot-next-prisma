import Guild from './guild'
import {writeFile} from 'fs'
import { color } from "../functions";


export default async function Update() {
    console.log(color("text","🕛 wait data to be prerendered"))
    const data = await Guild()
    const json = JSON.stringify({guild:data},null,2)
    writeFile('./prerender_data/guild_data.json', json, (err) => {
        if (err) throw err;
        console.log(color("text","📁 successfully write prerender data"));
    })
}
