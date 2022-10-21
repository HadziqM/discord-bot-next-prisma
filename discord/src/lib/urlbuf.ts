import https from 'https'
import http from 'http'

export default async function getBuff(url: string): Promise<Buffer> {
    return new Promise((resolve) => {
      url.startsWith('https')? https.get(url, (response) => {
        const body: Buffer[] = []
        response
          .on('data', (chunk: Buffer) => {
            body.push(chunk)
          })
          .on('end', () => {
            resolve(Buffer.concat(body))
          })
      }) : http.get(url, (response) => {
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