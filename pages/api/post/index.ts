import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany()

    res.json(posts)
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
