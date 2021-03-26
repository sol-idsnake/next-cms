import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

console.clear()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany()
    res.json(posts)
  } catch (error) {
    throw new Error(`\n\n\npages/api/index, ${error}\n\n\n`)
  }
}
