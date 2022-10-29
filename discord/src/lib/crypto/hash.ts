import bcrypt from 'bcrypt';

const saltRounds = 10;
export default async function Hash(pass:string) {
    const hash = await bcrypt.hash(pass,saltRounds)
    return hash
}

