import {writeFile} from 'fs'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();



export default async function Update() {
    const data = await prisma.blog.findMany()
    data.map(o => {
        const json = JSON.stringify({blog:o},null,2)
        writeFile(`./blog/${o.id}&&${o.category}.json`, json, (err) => {
            if (err) throw err;
        })
    })
}
