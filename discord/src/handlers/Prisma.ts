import { color } from "../functions";
import Update from '../lib/update'

module.exports = async () => {
    console.log(color("text",`🐘 Prisma-Postgres connection has been ${color("variable", "established.")}`))
    await Update().catch(e=>console.log("text",`🐘 Prisma-Postgres had some problem connecting to database with error${color("variable", `${e}`)}`))
}