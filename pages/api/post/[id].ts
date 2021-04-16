import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id

  handleGET(postId, res)
}

// GET /api/post/:id
async function handleGET(postId, res: NextApiResponse) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    res.json(post)
  } catch (error) {
    throw new Error(error.message)
  }
}

export default handle
