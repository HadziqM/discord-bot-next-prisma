import { BotEvent } from "../types";
import client from "../index";

const event : BotEvent = {
    name: 'error',
    execute: async (error:Error) =>{
        const ch = client.channels.cache.get('1031774270512169070')
        if (ch?.isTextBased()){ch.send(String(error))}
    }
}
export default event