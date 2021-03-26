import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id

  handleGET(postId, res)
}

// GET /api/post/:id
async function handleGET(postId, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: String(postId) },
    })

    res.json(post)
  } catch (error) {
    throw new Error(`\n\n\npages/api/[id], ${error}\n\n\n`)
  }
}

export default handle
