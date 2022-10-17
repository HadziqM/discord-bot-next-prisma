import https from 'https'

export default async function getBuff(url: string): Promise<Buffer> {
    return new Promise((resolve) => {
      https.get(url, (response) => {
        const body: Buffer[] = []
        response
          .on('data', (chunk: Buffer) => {
            body.push(chunk)
          })
          .on('end', () => {
            resolve(Buffer.concat(body))
          })
      })
    })
  }