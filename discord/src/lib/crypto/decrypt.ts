import bcrypt from 'bcrypt';

export default async function Decrypt(pass:string,hash:string) {
    return await bcrypt.compare(pass,hash)
}