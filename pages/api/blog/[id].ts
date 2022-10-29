import path from 'path';
import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const { id } = req.query
  const jsonDirectory = path.join(process.cwd(), 'discord/blog');
  const raw = readFileSync(jsonDirectory + '/1&&wtf.json')
  const fileContents= JSON.parse(String(raw))
  res.status(200).json(fileContents);
}